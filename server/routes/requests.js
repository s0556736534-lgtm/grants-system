const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// כל הנתיבים כאן דורשים שהמשתמש יהיה מחובר (protect)

// שליחת בקשה חדשה
router.post('/', protect, requestController.createRequest);

// קבלת הבקשות של הסטודנט המחובר
router.get('/my-requests', protect, requestController.getMyRequests);

// מנהל בלבד: קבלת כל הבקשות במערכת
router.get('/all', protect, adminOnly, requestController.getAllRequests);

// עדכון סטטוס - מנהל בלבד (שימוש ב-adminOnly)
router.patch('/:id/status', protect, adminOnly, requestController.updateRequestStatus);
module.exports = router;