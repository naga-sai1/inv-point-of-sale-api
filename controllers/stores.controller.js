import {connectToDatabase} from "../config/db.js";
import { Op } from "sequelize";

// Function to create a new store
const createStore = async (req, res) => {
  try {
    const { Stores } = await connectToDatabase();
    const { name, address, phone, email } = req.body;

    // Validate required fields
    if (!name || !address || !phone || !email) {
      return res.status(400).json({
        message: "Store name, address, phone number, and email are required",
      });
    }

    // Check if store already exists using store_name and phone_number
    const existingStore = await Stores.findOne({
      where: {
        [Op.or]: [{ name }, { phone }],
      },
    });

    if (existingStore) {
      return res.status(409).json({
        message: "Store with this name, email or phone number already exists",
      });
    }

    // Create new store
    const newStore = await Stores.create({
      name,
      address,
      phone,
      email,
    });

    res.status(201).json({
      message: "Store created successfully",
      store: newStore,
    });
  } catch (error) {
    console.error("Error in createStore:", error);
    res.status(500).json({
      message: "Failed to create store",
      error: error.message,
    });
  }
};

export { createStore };
