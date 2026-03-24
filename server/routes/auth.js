const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware'); // ייבוא השומר

// הנתיב רק קורא לפונקציה מהקונטרולר
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// נתיב חדש: בדיקה אם אני מחובר (זיהוי אוטומטי)
// שימי לב איך ה-protect עומד לפני הפונקציה של ה-controller
router.get('/me', protect, (req, res) => {
    // אם הגענו לכאן, ה-protect אישר את הטוקן
    res.status(200).json({ user: req.user });
});

module.exports = router;