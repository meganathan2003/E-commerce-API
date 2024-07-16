// here the file we create a server

const express = require('express');
const app = express();

// import the user route
const userRoute = require('./routes/userRoutes');
const authRoute = require('./routes/authRoutes');

const PORT = 3000;

app.use(express.json()); // Parse the all json files

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Server is running' });
});

// Below the code for user Route
app.use('api/users', userRoute);

// Auth route
app.use('api/auth', authRoute);

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})
