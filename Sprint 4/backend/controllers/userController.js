const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
const Job = require('../model/jobModel')

// @desc Register new users
// @route Post /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body

    if (!name || !email || !password || !role) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            role: user.role,
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }
}
)

// @desc Get new users
// @route Get /api/users/:id
// @access Public
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc Set interview for a user
// @route PATCH /api/users/:id/interview
// @access Private
const setInterview = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    const jobID = req.body.jobID;
    const date = new Date(req.body.date);
    const job = await Job.findOne({ jobID: { $eq: parseInt(jobID) } });
    let Timeconflict = false;
    if (user.interview.length > 0) {
        Timeconflict = user.interview && user.interview.length > 0 && user.interview.find(interview => interview.date && date && interview.date.setSeconds(0, 0) === date.setSeconds(0, 0));
    }
    if (user && job) {
        if (Timeconflict) {
            res.status(409);
            throw new Error('Date conflicted');
        }
        else {
            user.interview.push({
                job: job.jobID,
                date: date
            });
            const updatedUser = await user.save();
            res.json(updatedUser);
        }
    } else {
        res.status(404);
        throw new Error('User not found or job not found');
    }
});

// @desc Delete an interview by job ID
// @route DELETE /api/users/:id/interview/
// @access Private
const deleteInterview = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).populate('interview.job', 'title');
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const jobID = req.body.jobID;
    let interview, index;
    for (let i = 0; i < user.interview.length; i++) {
        if (user.interview[i].job.toString() === jobID.toString()) {
            interview = user.interview[i];
            index = i;
            break;
        }
    }
    if (!interview) {
        res.status(404);
        throw new Error(`Interview not found for job with ID: ${jobID}`);
    }

    // Remove the interview from the user's array of interviews
    user.interview.splice(index, 1);

    await user.save();

    res.json({ message: `Interview deleted for job: ${interview.job}` });
});


// @desc Get jobs
// @route Get /api/jobs
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const user = await User.find({});
    res.status(200).json(user)
})

// @desc Update a user by ID
// @route Put /api/users/
// @access Public
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.body.id);
    if (user) {
        user.email = req.body.email || user.email;
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            user.password = hashedPassword || user.password;
        }
        user.name = req.body.name || user.name;
        user.profilePicture = req.body.profilePicture || user.profilePicture;
        user.resume = req.body.resume || user.resume;
        user.companyName = req.body.companyName|| user.companyName;
        user.vision = req.body.vision || user.vision;
        user.industry = req.body.industry || user.industry;
        user.location = req.body.location || user.location;
        const updatedUser = await user.save();
        res.json(updatedUser);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc Delete a user by ID
// @route Delete /api/users/
// @access Public
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.body.id);
    if (user) {
        await user.remove();
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


// @desc Authenticate a user
// @route Post /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
            companyName: user.companyName,
            vision: user.vision,
            industry: user.industry,
            location: user.location
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }

})

// @desc Logout a user
// @route Post /api/users/logout
// @access Public
const logout = asyncHandler(async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded.id);
        const user = await User.findById(decoded.id);

        // Handle user not found or expired token error
        if (!user) {
            return res.status(401).send({ error: 'Invalid token' });
        }

        // Remove the token from the user's list of active tokens
        user.token = null;

        res.json(user);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    deleteUser,
    updateUser,
    getUserById,
    getAllUsers,
    logout,
    setInterview,
    deleteInterview
}