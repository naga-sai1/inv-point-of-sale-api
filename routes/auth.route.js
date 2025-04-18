import express from "express";
const router = express.Router();
import { login, signup } from "../controllers/auth.controller.js";
import { authenticateToken, authorizeRole } from "../middleware/auth.middleware.js";

router.post("/login", login);
router.post("/signup", authenticateToken, authorizeRole(["super-admin"]), signup);
router.get("/test_auth", authenticateToken, (req, res) => {
    res.json({
        message: "JWT verification successful",
    });
});

export default router;
