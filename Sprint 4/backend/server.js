const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000;
const path = require('path');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use(cookieParser())

app.use(express.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, '..', 'frontend')));
app.use('/ProfileFolder', express.static(path.join(__dirname, 'ProfileFolder')));
app.use('/ResumeFolder', express.static(path.join(__dirname, 'ResumeFolder')));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/files', require('./routes/fileRoutes'));

app.use('/', require('./routes/root'))
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
});


app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(port, () => console.log(`Server is running at port ${port}`));
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
