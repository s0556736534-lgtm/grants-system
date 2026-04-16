#  Student Grants Management System | מערכת לניהול בקשות מלגה

This project is a full-stack web application designed to streamline the process of applying for and managing student grants. It features a multi-step application form for students and a comprehensive management dashboard for administrators.

פרויקט זה הוא אפליקציית Full-stack המיועדת לייעל את תהליך הגשת הבקשות וניהול מלגות לסטודנטים. המערכת כוללת טופס הגשה רב-שלבי לסטודנטים ולוח בקרה לניהול בקשות עבור מנהלי המערכת.

---

##  Main Features | תכונות עיקריות

###  For Students (Client Side):
* **User Authentication:** Secure Login and Registration system.
* **Multi-Step Application:** Intuitive form covering personal, family, academic, and bank details.
* **Real-time Status Tracking:** Students can check if their application is pending, approved, or rejected.
* **Smart Auto-fill:** Personal details are automatically pulled from the user profile to save time.

###  For Administrators (Admin Side):
* **Request Dashboard:** View all incoming applications in a clear, organized table.
* **Status Management:** Update application status (Approve/Reject) with a single click.
* **Detailed View:** Access full information for each specific request.

---

## 🛠 Tech Stack | טכנולוגיות

* **Frontend:** React.js, Redux (State Management), React Router, Axios, SweetAlert2.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB with Mongoose.
* **Styling:** Custom CSS with responsive design.

---

## 📂 Project Structure | מבנה הפרויקט

* `/client`: React frontend application.
* `/server`: Node.js & Express backend API.

---

## ⚙️ Setup & Installation | התקנה והרצה

1. **Clone the repository:**
   `git clone https://github.com/s0556736534-lgtm/grants-system.git`

2. **Install dependencies for both Client and Server:**
   - **Inside /client:** `npm install`
   - **Inside /server:** `npm install`

3. **Run the project:**
   - **Start Server:** (מתוך תיקיית ה-server) `npm start`
   - **Start Client:** (מתוך תיקיית ה-client) `npm start`