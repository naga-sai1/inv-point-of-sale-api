import express from "express";
const router = express.Router();
import {
  authenticateToken,
  authorizeRole,
} from "../middleware/auth.middleware.js";
import { createStore, getallStores, getStoreById } from "../controllers/stores.controller.js";

router.post(
  "/create_stores",
  authenticateToken,
  authorizeRole(["super-admin"]),
  createStore
);
router.get(
  "/get_all_stores",
  authenticateToken,
  authorizeRole(["super-admin"]),
  getallStores
);
router.get(
  "/get_store_by_id/:store_id",
  authenticateToken,
  authorizeRole(["super-admin"]),
  getStoreById
);

export default router;
