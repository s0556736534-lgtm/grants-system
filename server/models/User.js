const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    tz: { 
        type: String, 
        required: true, 
        unique: true, // מבטיח שלא יהיו שני משתמשים עם אותה תעודת זהות
        trim: true 
    },
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    isManager: { 
        type: Boolean, 
        default: false // כברירת מחדל כל נרשם הוא סטודנט
    }
}, { timestamps: true }); // מוסיף אוטומטית תאריך יצירה ועדכון

module.exports = mongoose.model('User', userSchema);