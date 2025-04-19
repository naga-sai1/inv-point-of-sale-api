import express from "express";
const router = express.Router();
import {
  authenticateToken,
  authorizeRole,
} from "../middleware/auth.middleware.js";
import { createStore } from "../controllers/stores.controller.js";

router.post(
  "/create_stores",
  authenticateToken,
  authorizeRole(["super-admin"]),
  createStore
);

export default router;
