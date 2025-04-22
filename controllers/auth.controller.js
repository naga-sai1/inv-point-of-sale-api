import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "../config/db.js";
import { Op } from "sequelize";

const login = async (req, res) => {
  try {
    const { Users, Stores } = await connectToDatabase();

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
      { expiresIn: "24h" }
    );

    if (user.role !== "super-admin" ){
      // check if store is active
      const store = await Stores.findOne({ where: { store_id: req.params.store_id } });
      if (!store || !store.isActive) {
        return res.status(403).json({ message: "Store is not active" });
      }
    }


    await user.update({ last_login: new Date() });

    res.status(200).json({
      token,
      user: {
        userId: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
};

const signup = async (req, res) => {
  try {
    const { Users, Stores } = await connectToDatabase();
    const { username, password, email, role, store_id } = req.body;

    if (!username || !password || !email || !store_id) {
      return res.status(400).json({
        message: "Username, password, email, and store_id are required",
      });
    }

    const store = await Stores.findOne({ where: { store_id } });
    if (!store) {
      return res.status(400).json({
        message: "Store does not exist",
      });
    }

    const adminCount = await Users.count({
      where: {
        role: "admin",
        store_id: store_id,
      },
    });

    if (adminCount > 0 && role === "admin") {
      return res.status(400).json({
        message: "An admin already exists for this store",
      });
    }

    const existingUser = await Users.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username or email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await Users.create({
      username,
      password: hashedPassword,
      email,
      role: role || "cashier",
      last_login: new Date(),
      store_id,
      status: true,
    });

    const token = jwt.sign(
      { userId: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        userId: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

// get user's by store_id
const getUsersByStoreId = async (req, res) => {
  try {
    const { Users } = await connectToDatabase();
    const { store_id } = req.params;

    const users = await Users.findAll({
      where: { store_id },
      attributes: ["user_id", "username", "email", "role", "status"],
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsersByStoreId:", error);
    res.status(500).json({
      message: "Failed to retrieve users",
      error: error.message,
    });
  }
};

export { login, signup, getUsersByStoreId };
