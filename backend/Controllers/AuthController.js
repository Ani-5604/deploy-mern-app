const UserModel = require("../Models/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator'); // Add input validation

const signup = async (req, res) => {
    try {
        // Input validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Invalid input', errors: errors.array(), success: false });
        }

        console.log('Signup request received:', req.body);
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            console.log('User already exists');
            return res.status(409).json({ message: 'User already exists, you can login', success: false });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();
        
        console.log('User saved successfully');
        res.status(201).json({ message: "Signup successful", success: true });
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({ message: "Internal server error", success: false, error: 'An error occurred while processing your request' });
    }
}

const login = async (req, res) => {
    try {
        // Input validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Invalid input', errors: errors.array(), success: false });
        }

        console.log('Login request received:', req.body);
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(403).json({ message: 'User not found', success: false });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Incorrect password');
            return res.status(403).json({ message: "Incorrect password", success: false });
        }

        const jwtToken = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        console.log('Login successful');
        res.status(200).json({ message: "Login successful", success: true, jwtToken, email, name: user.name });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: "Internal server error", success: false, error: 'An error occurred while processing your request' });
    }
}

module.exports = {
    signup,
    login
}
