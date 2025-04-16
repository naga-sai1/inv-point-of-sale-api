const connectToDatabase = require('../config/db');
const { Op } = require('sequelize');


// Function to create a new store
const createStore = async (req, res) => {
    try {
        const { Stores } = await connectToDatabase();
        const { store_name, address, phone_number, email, status } = req.body;

        // Validate required fields
        if (!store_name || !address || !phone_number || !email) {
            return res.status(400).json({
                message: "Store name, address, phone number, and email are required"
            });
        }

        // Check if store already exists using store_name and phone_number
        const existingStore = await Stores.findOne({
            where: {
                [Op.and]: [
                    { store_name },
                    { phone_number }
                ]
            }
        });

        if (existingStore) {
            return res.status(409).json({
                message: "Store with this name, email or phone number already exists"
            });
        }

        // Create new store
        const newStore = await Stores.create({
            store_name,
            address,
            phone_number,
            email,
            status: status || true
        });

        res.status(201).json({
            message: "Store created successfully",
            store: newStore
        });
    } catch (error) {
        console.error('Error in createStore:', error);
        res.status(500).json({
            message: "Failed to create store",
            error: error.message
        });
    }
};