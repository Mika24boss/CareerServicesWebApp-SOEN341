const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
// @desc Register new users
// @route Post /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
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
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }
}
)

// @desc Get new users
// @route Get /api/users
// @access Public
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.body.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc Update a user by ID
// @route Patch /api/users/
// @access Public
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.body.id);
    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    if (user) {
        user.email = req.body.email || user.email;
        user.password = hashedPassword || user.password;
        user.name = req.body.name || user.name;
        user.profilePicture = req.body.profilePicture || user.profilePicture;
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
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
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
    logout
}