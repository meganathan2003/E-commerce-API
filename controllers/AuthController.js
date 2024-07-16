// In this controller js check the all db vaild data and validations
const User = require("../models/user")
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {

        // Check the user already exists
        let user = await User.findByEmail(email);
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bycrypt.genSalt(10); // This salt ah encrypt the password
        const hashPassword = await bycrypt.hash(password, salt);

        await User.create({ name, email, password: hashPassword });

        const payload = {
            user: {
                email: email,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token }); // Send as a json
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Here is the payload
        const isMatch = await bycrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                email: user.email,
            },
        }

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server Error");
    }
};

