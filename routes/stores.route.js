import express from "express";
const router = express.Router();
import {
  authenticateToken,
  authorizeRole,
} from "../middleware/auth.middleware.js";
import { createStore } from "../controllers/stores.controller.js";

router.post(
  "/stores",
  authenticateToken,
  authorizeRole(["admin"]),
  createStore
);

export default router;
