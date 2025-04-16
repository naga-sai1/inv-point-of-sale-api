const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const connectToDatabase = require('../config/db');
const { Op } = require('sequelize');

const login = async (req, res) => {
    try {
        const { Users } = await connectToDatabase();
        const { username, password } = req.body;

        const user = await Users.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user.user_id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        await user.update({ last_login: new Date() });

        res.status(200).json({
            token,
            user: {
                userId: user.user_id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({
            message: "Authentication failed",
            error: error.message
        });
    }
};

const signup = async (req, res) => {
    try {
        const { Users, Stores } = await connectToDatabase();
        const { username, password, email, role, store_id } = req.body;

        // Validate required fields
        if (!username || !password || !email || !store_id) {
            return res.status(400).json({
                message: "Username, password, email, and store_id are required"
            });
        }

        // check if store exists    
        const store = await Stores.findOne({ where: { store_id } });
        if (!store) {
            return res.status(400).json({
                message: "Store does not exist"
            });
        }

        // only one admin can exist per store
        const adminCount = await Users.count({
            where: {
                role: 'admin',
                store_id: store_id
            }
        });

        if (adminCount > 0 && role === 'admin') {
            return res.status(400).json({
                message: "An admin already exists for this store"
            });
        }

        // Check if username or email already exists
        const existingUser = await Users.findOne({
            where: {
                [Op.or]: [
                    { username },
                    { email }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Username or email already exists"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await Users.create({
            username,
            password: hashedPassword,
            email,
            role: role || 'cashier', // Default role
            last_login: new Date()
        });

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.user_id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: "User created successfully",
            token,
            user: {
                userId: user.user_id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
};

module.exports = {
    login,
    signup
}; 