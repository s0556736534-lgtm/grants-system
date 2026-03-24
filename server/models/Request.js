const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // סטטוס הבקשה (לשימוש המנהל)
    status: {
        type: String,
        enum: ['pending', 'allow', 'reject'],
        default: 'pending'
    },
    
    // 1. פרטים אישיים (Personal)
    personal: {
        tz: { type: String, required: true },
        firstName: String,
        lastName: String,
        dateOfBirth: Date,
        address: String,
        phoneNumber: String,
        email: String
    },

    // 2. פרטי משפחה (Family)
    family: {
        fatherName: String,
        motherName: String,
        numOfChildren: Number,
        siblings19Plus: Number
    },

    // 3. פרטי קורס/לימודים (Course)
    course: {
        courseName: String,
        paymentLearn: Number,
        years: Number
    },

    // 4. פרטי בנק (Bank)
    bank: {
        accountOwner: String,
        bankName: String,
        branchNum: String,
        accountNum: String
    },

    adminNotes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('GrantRequest', requestSchema);