const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    // 1. חילוץ הטוקן מהעוגיות (זוכרת שהשתמשנו ב-cookie-parser?)
    const token = req.cookies.token;

    // 2. בדיקה אם הטוקן בכלל קיים
    if (!token) {
        return res.status(401).json({ message: 'לא מורשה, אין טוקן' });
    }

    try {
        // 3. אימות הטוקן בעזרת המפתח הסודי מה-.env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. הוספת נתוני המשתמש מהטוקן לאובייקט הבקשה (req)
        // כך שכל פונקציה בהמשך תוכל לדעת מי המשתמש (req.user)
        req.user = decoded;

        // 5. הכל תקין - המשך לפונקציה הבאה (ל-Controller)
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).json({ message: 'טוקן לא תקין או פג תוקף' });
    }
};

// מידלוור נוסף לבדיקה אם המשתמש הוא מנהל
const adminOnly = (req, res, next) => {
    if (req.user && req.user.isManager) {
        next();
    } else {
        res.status(403).json({ message: 'גישה נדחתה: מיועד למנהלים בלבד' });
    }
};

module.exports = { protect, adminOnly };