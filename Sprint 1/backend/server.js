const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000;
const path = require('path');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// TOT-ADD HTML LOGIN PAGE
//     app.use(express.static(path.join(__dirname, './frontend1/build')));


//     app.all('*', (req, res) =>
//      res.status(404)
//      if (req.accepts('html)){
//         res.sendFile(
//             path.resolve(__dirname, './', 'frontend1', 'build', 'index.html') //ADd the path later
//         )}
//      else if (req.accepts('json)){
//      res.json({message: '404 not found'})
//}
// else {
//      res.type('txt).send()  
//}
//     ); 

// Serve frontend
// if (process.env.NODE_ENV === 'production') {


// } else {
//     app.get('/', (req, res) => res.send('Please set to production'));
// }
app.use(errorHandler)

app.listen(port, () => console.log(`Server is running at port ${port}`));