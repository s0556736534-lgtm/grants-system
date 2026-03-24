const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// לוגיקת ההרשמה
exports.register = async (req, res) => {
    try {
        const { tz, firstName, lastName, password } = req.body;

        // בדיקה אם קיים
        const existingUser = await User.findOne({ tz });
        if (existingUser) {
            return res.status(400).json({ message: 'משתמש קיים' });
        }

        // הצפנה
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // שמירה
        const newUser = new User({ tz, firstName, lastName, password: hashedPassword });
        await newUser.save();

        res.status(201).json({
            message: 'נרשם בהצלחה',
            user: {
                id: newUser._id,
                tz: newUser.tz,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                isManager: newUser.isManager
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'שגיאת שרת' });
    }
};
//login
exports.login = async (req, res) => {
    try {
        const { tz, password } = req.body;

        // 1. חיפוש המשתמש לפי תעודת זהות
        const user = await User.findOne({ tz });
        console.log("Body received:", req.body);/////
        console.log("User found in DB:", user ? "Yes" : "No");////
        if (!user) {
            return res.status(401).json({ message: 'תעודת זהות או סיסמה שגויים' });
        }

        // 2. השוואת הסיסמה שהוזנה עם הסיסמה המוצפנת בבסיס הנתונים
        // bcrypt.compare מחזיר true אם יש התאמה
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'תעודת זהות או סיסמה שגויים' });
        }

        // 3. יצירת הטוקן (JWT)
        // אנחנו מכניסים לתוך הטוקן את ה-ID והתפקיד של המשתמש
        const token = jwt.sign(
            { id: user._id, isManager: user.isManager, tz: user.tz },
            process.env.JWT_SECRET || 'secret_key_123', // מפתח סודי מה-.env
            { expiresIn: '1d' } // הטוקן יהיה תקף ליום אחד
        );

        // 4. שליחת הטוקן בעוגייה (Cookie)
        res.cookie('token', token, {
            httpOnly: true,     // הגנה מפני גניבת טוקן ע"י סקריפטים (XSS)
            secure: false,      // בשלב הפיתוח (localhost) נשים false, בשרת אמיתי true
            sameSite: 'Lax',    // מונע בעיות של שליחת עוגיות בין דפדפנים
            maxAge: 24 * 60 * 60 * 1000 // יום אחד במילי-שניות
        });
        // 5. הצלחה! מחזירים את פרטי המשתמש (ללא הסיסמה כמובן)
        res.status(200).json({
            message: 'התחברת בהצלחה!',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                isManager: user.isManager
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'שגיאת שרת פנימית' });
    }
};
// יציאה
exports.logout = (req, res) => {
    res.clearCookie('token'); // מוחק את העוגייה שנקראת token
    res.status(200).json({ message: 'התנתקת בהצלחה' });
};