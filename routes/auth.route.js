const express = require('express');
const router = express.Router();
const { login, signup } = require('../controllers/auth.controller');
const { authenticateToken, authorizeRole } = require('../middleware/auth.middleware');

// Public routes
router.post('/login', login);
router.post('/signup', authenticateToken, authorizeRole(['super-admin']), signup); // Only super-admin can create new users
router.get('/test_auth', authenticateToken, (req, res) => {
    res.json({
        message: "JWT verification successful"
    })
})

module.exports = router;