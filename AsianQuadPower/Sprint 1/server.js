const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./backend/middleware/errorMiddleware')
const connectDB = require('./backend/config/db')
const port = process.env.PORT || 5000;
const path = require('path');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./backend/routes/goalRoutes'));
app.use('/api/users', require('./backend/routes/userRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, './frontend1/build')));

    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, './', 'frontend1', 'build', 'index.html')
        )
    );
} else {
    app.get('/', (req, res) => res.send('Please set to production'));
}
app.use(errorHandler)

app.listen(port, () => console.log(`Server is running at port ${port}`));