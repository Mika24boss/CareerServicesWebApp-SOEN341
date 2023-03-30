//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let mongoose = require("mongoose");
let User = require('../model/userModel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

chai.use(chaiHttp);
describe('GET /', function () {
    it('should return all users with status 200', async function () {
        const user1 = new User({ name: 'User1', email: 'user1@example.com', password: 'password1', role: 'Admin' });
        const user2 = new User({ name: 'User2', email: 'user2@example.com', password: 'password2', role: 'Admin' });
        await user1.save();
        await user2.save();

        const token = generateToken(user1._id); // generate a token for a user

        const res = await chai.request(app)
            .get('/')
            .set('Authorization', `Bearer ${token}`); // set the token in the headers

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(2);
        expect(res.body[0]).to.have.property('name').equal('User1');
        expect(res.body[0]).to.have.property('email').equal('user1@example.com');
        expect(res.body[1]).to.have.property('name').equal('User2');
        expect(res.body[1]).to.have.property('email').equal('user2@example.com');
    });
});