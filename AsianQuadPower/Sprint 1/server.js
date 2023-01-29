const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./backend/middleware/errorMiddleware')
const connectDB = require('./backend/config/db')
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./backend/routes/goalRoutes'));
app.use('/api/users', require('./backend/routes/userRoutes'));
app.use(errorHandler)

app.listen(port, () => console.log(`Server is running at port ${port}`));