const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const mongoose = require("mongoose");
const User = require('../model/userModel');
const Job = require('../model/jobModel');
const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const expect = chai.expect;
const describe = mocha.it;
const it = mocha.it;

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

chai.use(chaiHttp);

describe('RegisterFunction', function () {
    console.log('here3')
    it('should return all users with status 200', async function () {
        console.log('here2')
        const user1 = new User({ name: 'User1', email: 'user1@example.com', password: 'password1', role: 'Admin' });
        await user1.save();
        console.log('here1')

        const token = generateToken(user1._id); // generate a token for a user

        const res = await chai.request(server)
            .get('/api/users/')
            .set('Authorization', `Bearer ${token}`); // set the token in the headers
        console.log("here")
        expect(res).to.have.status(200);
    });
});
describe('LoginFunction', function () {
    it('should return a JWT token when valid credentials are provided', async function () {
        chai.request(app)
            .post('/api/users/login')
            .send({ email: 'admin', password: 'admin' })
            .then((res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('token');
                done();
            })
            .catch((err) => {
                done(err);
            });

    });
    it('should return an error when invalid credentials are provided', (done) => {
        // Make a request to the login endpoint with invalid credentials
        chai.request(app)
            .post('/api/users/login')
            .send({ email: 'testuser@example.com', password: 'wrongpassword' })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.an('object');
                res.body.should.have.property('message').equal('Invalid email or password');
                done();
            });
    });
});

describe('DeleteUserFunction', () => {
    it('should delete a user by id', async () => {
        // create a user to delete
        const user = new User({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password'
        });
        await user.save();

        const res = await chai.request(app)
            .delete(`/api/users/${user._id}`)
            .send({ id: `${user._id}` });

        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('message').equal('User deleted successfully');

        // make sure the user is actually deleted
        const deletedUser = await User.findById(user._id);
        expect(deletedUser).to.be.null;
    });
});

describe('PostJobFunction', () => {
    it('should create a new job', async () => {
        const job = new Job({
            title: 'Test',
            company: 'Test',
            description: 'We are looking for a software engineer to join our team',
            interviewDate: '2023-04-12T12:30:00',

        });
        await job.save();
        const admin = chai.request(app)
            .post('/api/users/login')
            .send({ email: 'admin', password: 'admin' })
            .then((res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('token');
                done();
            })
            .catch((err) => {
                done(err);
            });

        chai.request(app)
            .post('/api/jobs')
            .send(job)
            .set('Authorization', `Bearer ${admin._token}`) // set the token in the headers
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(201);
                res.body.should.be.an('object');
                res.body.should.have.property('message').equal('Job created successfully');
                done();
            });
    });
});

describe('DeleteJobByIDFunction', () => {
    it('should create a new job', async () => {
        const job = new Job({
            title: 'Test',
            company: 'Test',
            description: 'We are looking for a software engineer to join our team',
            interviewDate: '2023-04-12T12:30:00',

        });
        await job.save();
        const admin = chai.request(app)
            .post('/api/users/login')
            .send({ email: 'admin', password: 'admin' })
            .then((res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('token');
                done();
            })
            .catch((err) => {
                done(err);
            });

        const response = chai.request(app)
            .post('/api/jobs')
            .send(job)
            .set('Authorization', `Bearer ${admin._token}`) // set the token in the headers
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(201);
                res.body.should.be.an('object');
                res.body.should.have.property('message').equal('Job created successfully');
                done();
            });

        chai.request(app)
            .delete(`/api/jobs/${response.jobID}`)
            .set('Authorization', `Bearer ${admin._token}`) // set the token in the headers
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('success').that.equals(true);
                done();
            });
    });
});






