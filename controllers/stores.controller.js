import { connectToDatabase } from "../config/db.js";
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

    const created_at = new Date();

    // Create new store
    const newStore = await Stores.create({
      name,
      address,
      phone,
      email,
      created_at,
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

//  get all stores implement pagination and search by name, address, phone number and email
const getallStores = async (req, res) => {
  try {
    const { Stores } = await connectToDatabase();
    const { page = 1, limit = 10, search = "" } = req.query;

    const offset = (page - 1) * limit;
    const stores = await Stores.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { address: { [Op.like]: `%${search}%` } },
          { phone: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
        ],
      },
      limit,
      offset,
    });

    res.status(200).json({
      message: "Stores retrieved successfully",
      stores: stores.rows,
      totalStores: stores.count,
      totalPages: Math.ceil(stores.count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error in getAllStores:", error);
    res.status(500).json({
      message: "Failed to retrieve stores",
      error: error.message,
    });
  }
};

// Function to get a store by ID
const getStoreById = async (req, res) => {
  try {
    const { Stores } = await connectToDatabase();
    const { store_id } = req.params;

    const store = await Stores.findOne({
      where: { store_id },
    });

    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    res.status(200).json({
      message: "Store retrieved successfully",
      store,
    });
  } catch (error) {
    console.error("Error in getStoreById:", error);
    res.status(500).json({
      message: "Failed to retrieve store",
      error: error.message,
    });
  }
};

// update store by id
const updateStoreById = async (req, res) => {
  try {
    const { Stores } = await connectToDatabase();
    const { store_id } = req.params;
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
        message: "Store with this name or phone number already exists",
      });
    }

    // Update store
    const updatedStore = await Stores.update(
      { name, address, phone, email },
      { where: { store_id } }
    );

    if (!updatedStore[0]) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    res.status(200).json({
      message: "Store updated successfully",
      store: updatedStore,
    });
  } catch (error) {
    console.error("Error in updateStoreById:", error);
    res.status(500).json({
      message: "Failed to update store",
      error: error.message,
    });
  }
};

export { createStore, getallStores, getStoreById, updateStoreById };
