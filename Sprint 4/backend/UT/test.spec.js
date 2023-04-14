const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const mongoose = require("mongoose");
const User = require('../model/userModel');
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

try {
    describe('GET /api/users', function () {
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
    })
}
catch (error) {
    console.log(error);
};