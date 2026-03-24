const GrantRequest = require('../models/Request');

// יצירת בקשה חדשה
exports.createRequest = async (req, res) => {
    try {
        // הנתונים מגיעים מה-body של ה-React
        const { personal, family, course, bank } = req.body;

        const newRequest = new GrantRequest({
            student: req.user.id, // ה-ID מגיע מה-Middleware של ה-Token
            personal,
            family,
            course,
            bank
        });

        const savedRequest = await newRequest.save();
        res.status(201).json({ message: 'הבקשה נשלחה בהצלחה', request: savedRequest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'שגיאה בשמירת הבקשה' });
    }
};

// קבלת כל הבקשות של סטודנט ספציפי (עבור מסך "הסטטוס שלי")
exports.getMyRequests = async (req, res) => {
    try {
        const requests = await GrantRequest.find({ student: req.user.id });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בשליפת הבקשות' });
    }
};

// קבלת כל הבקשות במערכת (עבור מסך המנהל)
exports.getAllRequests = async (req, res) => {
    try {
        // .populate('student', 'firstName lastName') מביא גם את פרטי המשתמש מהמודל User
        const requests = await GrantRequest.find().populate('student', 'firstName lastName');
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בשליפת כל הבקשות' });
    }
};
// עדכון סטטוס בקשה (למנהל בלבד)
exports.updateRequestStatus = async (req, res) => {
    try {
        const { id } = req.params; // ה-ID של הבקשה מהכתובת
        const { status } = req.body; // הסטטוס החדש: 'אושר' או 'נדחה' (או 'allow'/'reject' לפי הרידקס שלך)

        // בדיקה שהסטטוס תקין
        const validStatuses = ['pending', 'allow', 'reject'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'סטטוס לא תקין' });
        }

        const updatedRequest = await GrantRequest.findByIdAndUpdate(
            id,
            { status: status },
            { new: true } // מחזיר את האובייקט המעודכן
        );

        if (!updatedRequest) {
            return res.status(404).json({ message: 'הבקשה לא נמצאה' });
        }

        res.status(200).json({ message: 'הסטטוס עודכן בהצלחה', request: updatedRequest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'שגיאה בעדכון הסטטוס' });
    }
};