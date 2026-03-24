const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // מחבר את ה-Router
const cookieParser = require('cookie-parser');
const requestRoutes = require('./routes/requests');

require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // הכתובת של הריאקט שלך
    credentials: true                // חשוב מאוד כדי שהטוקן (העוגייה) יעבור!
}));
app.use(express.json()); // מאפשר לשרת לקרוא JSON שנשלח מה-React
app.use(cookieParser());
// console.log("Secret Key is:", process.env.JWT_SECRET);
// Routes Connection
// כאן את אומרת לשרת: "כל בקשה שמתחילה ב-/api/auth, תעביר לקובץ auth.js"
app.use('/api/auth', authRoutes); 
app.use('/api/requests', requestRoutes);

// חיבור למסד הנתונים (החליפי את ה-URL בקישור של ה-MongoDB שלך)
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/grants_system';

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Connected to MongoDB successfully'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// נקודת בדיקה ראשונית
app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

