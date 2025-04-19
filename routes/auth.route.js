import express from "express";
const router = express.Router();
import { login, signup, getUsersByStoreId } from "../controllers/auth.controller.js";
import {
  authenticateToken,
  authorizeRole,
} from "../middleware/auth.middleware.js";

router.post("/login", login);
router.post(
  "/signup",
  authenticateToken,
  authorizeRole(["super-admin"]),
  signup
);
router.get("/test_auth", authenticateToken, (req, res) => {
  res.json({
    message: "JWT verification successful",
  });
});
router.get(
  "/get_users_by_store_id/:store_id",
  authenticateToken,
  authorizeRole(["super-admin"]),
  getUsersByStoreId
);

export default router;
