import { useDispatch, useSelector } from 'react-redux'
import '../style.css' // ⬅️ הייבוא הנכון כבר קיים!
import { useState } from 'react'
import { registerUser } from '../redux/userSlice'
import { useNavigate } from 'react-router'
// **הוספת ספריית swal להצגת הודעת שגיאה כללית**
import swal from 'sweetalert'
// ... ייבואים קיימים
import api from '../api'

export const Register = () => {
    const dispatch = useDispatch()
    const [user, setUser] = useState({}) 
    const navigate = useNavigate()
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        let isValid = true;
        
        if (!user.firstName || user.firstName.trim().length < 2) {
            newErrors.firstName = "שם פרטי חובה"; isValid = false;
        }
        if (!user.lastName || user.lastName.trim().length < 2) {
            newErrors.lastName = "שם משפחה חובה"; isValid = false;
        }
        if (!user.tz || !/^\d{9}$/.test(user.tz)) {
            newErrors.tz = "ת.ז. חייבת להיות 9 ספרות"; isValid = false;
        }
        if (!user.password || user.password.length < 6) {
            newErrors.password = "סיסמה לפחות 6 תווים"; isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const check = async () => {
        if (!validate()) return;

        try {
            // שולחים את המשתמש החדש לשרת
            const response = await api.post('/auth/register', user);
            
            if (response.status === 201) {
                dispatch(registerUser(response.data.user));
                swal("מזל טוב!", "החשבון נוצר בהצלחה", "success");
                navigate('/Home');
            }
        } catch (err) {
            const msg = err.response?.data?.message || "שגיאה ברישום";
            swal("שגיאה", msg, "error");
        }
    }

    // ה-JSX נשאר כמעט זהה, רק לוודא שה-onChange מעדכן את ה-state נכון

// export const Register = () => {
//     const users = useSelector(s => s.users.users)
//     const dispach = useDispatch()
//     const [user, setUser] = useState({}) 
//     const navigate = useNavigate()
//     const current = useSelector(s => s.users.current)
    
//     // **⬅️ קוד שלי: הוספת מצב לשגיאות**
//     const [errors, setErrors] = useState({});

//     // **⬅️ קוד שלי: פונקציית ולידציה מרכזית**
//     const validate = () => {
//         const newErrors = {};
//         let isValid = true;
        
//         // 1. שם פרטי (חובה, לפחות 2 תווים)
//         if (!user.firstName || user.firstName.trim().length < 2) {
//             newErrors.firstName = "שם פרטי הוא שדה חובה (לפחות 2 תווים).";
//             isValid = false;
//         }

//         // 2. שם משפחה (חובה, לפחות 2 תווים)
//         if (!user.lastName || user.lastName.trim().length < 2) {
//             newErrors.lastName = "שם משפחה הוא שדה חובה (לפחות 2 תווים).";
//             isValid = false;
//         }

//         // 3. תעודת זהות (חובה, 9 ספרות, ולוודא שאינו קיים כבר)
//         if (!user.tz || !/^\d{9}$/.test(user.tz)) {
//             newErrors.tz = "תעודת זהות חייבת להיות בת 9 ספרות.";
//             isValid = false;
//         } else if (users.some(u => u.tz === user.tz)) {
//             // בדיקה אם המשתמש כבר קיים
//             swal('שגיאה', 'משתמש עם תעודת זהות זו כבר קיים במערכת!', 'error');
//             newErrors.tz = "תעודת זהות זו כבר רשומה.";
//             isValid = false;
//         }

//         // 4. סיסמה (חובה, לפחות 6 תווים)
//         if (!user.password || user.password.length < 6) {
//             newErrors.password = "הסיסמה חייבת להיות לפחות 6 תווים.";
//             isValid = false;
//         }

//         setErrors(newErrors);
//         return isValid;
//     }

//     const check = () => {
//         if (validate()) { // **⬅️ קוד שלי: קריאה לוולידציה**
//             dispach(registerUser(user))
//             navigate('/Home')
//             // console.log(users); // אין צורך בהדפסה זו כשיש ניווט
//         } else {
//             console.log("Validation Failed.");
//         }
//     }

    return <>
    
        <div className="auth-page-container"> 
            
            <div className="form">
                <form className="signup-form" action="" method="post">
                    <i className="fas fa-user-plus"></i>
                    <h2>יצירת חשבון חדש</h2> 
                    
                    {/* שדות קלט */}
                    <input 
                        className={`user-input ${errors.firstName ? 'input-error' : ''}`} // **⬅️ קוד שלי: הוספת קלאס שגיאה**
                        name="firstName" 
                        placeholder="שם פרטי" 
                        required 
                        onBlur={e => setUser({ ...user, firstName: e.target.value })}
                        // **⬅️ קוד שלי: שימוש ב-onChange כדי לעדכן בזמן אמת**
                        onChange={e => setUser({ ...user, firstName: e.target.value })}
                    />
                    {/* **⬅️ קוד שלי: הצגת הודעת שגיאה** */}
                    {errors.firstName && <div className="error-message">{errors.firstName}</div>}

                    <input 
                        className={`user-input ${errors.lastName ? 'input-error' : ''}`} // **⬅️ קוד שלי: הוספת קלאס שגיאה**
                        name="lastName" 
                        placeholder="שם משפחה" 
                        required 
                        onBlur={e => setUser({ ...user, lastName: e.target.value })}
                        // **⬅️ קוד שלי: שימוש ב-onChange כדי לעדכן בזמן אמת**
                        onChange={e => setUser({ ...user, lastName: e.target.value })}
                    />
                    {/* **⬅️ קוד שלי: הצגת הודעת שגיאה** */}
                    {errors.lastName && <div className="error-message">{errors.lastName}</div>}

                    <input 
                    // value={current.tz}
                        // ערכי current אינם רלוונטיים כאן, משתמש חדש אמור להכניס ערכים
                        className={`user-input ${errors.tz ? 'input-error' : ''}`} // **⬅️ קוד שלי: הוספת קלאס שגיאה**
                        type="text" 
                        name="tz" 
                        placeholder="תעודת זהות" 
                        required 
                        onBlur={e => setUser({ ...user, tz: e.target.value })}
                        // **⬅️ קוד שלי: שימוש ב-onChange כדי לעדכן בזמן אמת**
                        onChange={e => setUser({ ...user, tz: e.target.value })}
                    />
                    {/* **⬅️ קוד שלי: הצגת הודעת שגיאה** */}
                    {errors.tz && <div className="error-message">{errors.tz}</div>}

                    <input 
                    // value={current.password}
                        // ערכי current אינם רלוונטיים כאן, משתמש חדש אמור להכניס ערכים
                        className={`user-input ${errors.password ? 'input-error' : ''}`} // **⬅️ קוד שלי: הוספת קלאס שגיאה**
                        type="password" 
                        name="password" 
                        placeholder="סיסמה" 
                        required 
                        onBlur={e => setUser({ ...user, password: e.target.value })}
                        // **⬅️ קוד שלי: שימוש ב-onChange כדי לעדכן בזמן אמת**
                        onChange={e => setUser({ ...user, password: e.target.value })}
                    />
                    {/* **⬅️ קוד שלי: הצגת הודעת שגיאה** */}
                    {errors.password && <div className="error-message">{errors.password}</div>}
                    
                    {/* ⬅️ כפתור הרשמה: שימוש בקלאסים הגלובליים */}
                    <input 
                        onClick={check} 
                        className="btn primary-btn" 
                        type='button' 
                        value="הרשמה"
                    />
                    
                    <div className="options-02">
                        <p>כבר רשום? <a onClick={()=>navigate('/Login')}>כניסה</a></p>
                    </div>
                </form>
            </div>
        </div>
    </>
}