import { useDispatch, useSelector } from "react-redux"
import { add, update } from "../redux/requestSlice"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react" 
import api from '../api'; 
import swal from "sweetalert";

export const Submit = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const allrequests = useSelector(s => s.requests.asksList)
    const current = useSelector(state => state.requests.current)

    const [isFormComplete, setIsFormComplete] = useState(false);

    // -----------------------------------------------------------------
    // ⬅️ שיפור 1: הגדרת מבנה השדות המצופה לכל שלב בטופס
    // זה מבטיח שאנו בודקים את כל שדות החובה, גם אם הם אותחלו ל-"".
    // -----------------------------------------------------------------
    const REQUIRED_FIELDS = {
        personal: ['tz', 'firstName', 'lastName', 'dateOfBirth', 'adress', 'phoneNumber', 'email'],
        family: ['fatherName', 'motherName', 'numOfChildren', 'siblings19Plus'],
        course: ['course', 'paymentLearn', 'years'],
        bank: ['acountOwner', 'bankName', 'branchNum', 'accountNum']
    };


    // -----------------------------------------------------------------
    // ⬅️ שיפור 2: פונקציית בדיקת מילוי כל שדות החובה בטופס
    // -----------------------------------------------------------------
    const checkFormCompleteness = (formData) => {
        // עובר בלולאה על השלבים המצופים (personal, family, course, bank)
        for (const stepKey in REQUIRED_FIELDS) {
            
            // בודק אם הנתונים לאותו שלב בכלל קיימים ב-current
            const stepData = formData[stepKey];
            if (!stepData) {
                console.log(`שגיאה קריטית: שלב [${stepKey}] חסר לחלוטין ב-Redux.`);
                return false;
            }

            // עובר בלולאה על כל שדה חובה בתוך השלב
            const requiredFieldsInStep = REQUIRED_FIELDS[stepKey];
            for (const fieldKey of requiredFieldsInStep) {
                
                const fieldValue = stepData[fieldKey];

                // בדיקת ריקות: אם הערך הוא null, undefined, מחרוזת ריקה, או מכיל רק רווחים
                if (fieldValue === null || fieldValue === undefined || String(fieldValue).trim() === "") {
                    console.log(`שגיאה: שדה חובה ריק נמצא בשלב [${stepKey}], שדה [${fieldKey}]`);
                    return false; // שדה חובה ריק נמצא
                }
            }
        }
        
        return true; // כל שדות החובה מלאים
    };


    // ⬅️ הפעלת הבדיקה בכל פעם ש-current משתנה
    useEffect(() => {
        const complete = checkFormCompleteness(current);
        setIsFormComplete(complete);
    }, [current]);

    // -----------------------------------------------------------------

    // const permit = () => {
    //     // ⬅️ בדיקה כפולה לפני השליחה (תמיד חובה במקרה של disabled)
    //     if (!checkFormCompleteness(current)) {
    //         // זו הודעה פנימית, המשתמש כבר ראה שהכפתור מושבת.
    //         console.error("שליחה נחסמה: ישנם שדות חובה ריקים.");
    //         return; 
    //     }

    //     dispatch(add())
    //     navigate('/Home')
    //     console.log("נתונים נשלחו בהצלחה! הסיכום:", allrequests);
    // }

    const cancel = () => {
        // איפוס ה-current ב-Redux ושמירה על הלוגיקה הקיימת שלך
        // הערה: נשמר האיפוס המקורי שלך
        dispatch(update({ typeForm: "personal", data: { tz: "", firstName: "", lastName: "", dateOfBirth: "", adress: "", phoneNumber: "", email: "" } }))
        dispatch(update({ typeForm: "family", data: { fatherName: "", motherName: "", numOfChildren: "", siblings19Plus: "" } }))
        dispatch(update({ typeForm: "course", data: { course: "", paymentLearn: "", years: "" } }))
        dispatch(update({ typeForm: "bank", data: { acountOwner: "", bankName: "", branchNum: "", accountNum: "" } }))
        
        navigate('/Home')
        console.log("הטופס בוטל ומאופס:", current);
    }
    const permit = async () => {
        // 1. בדיקת תקינות (כמו שעשית)
        if (!checkFormCompleteness(current)) {
            console.error("שליחה נחסמה: ישנם שדות חובה ריקים.");
            return; 
        }

        try {
            // 2. שליחת הנתונים לשרת
            // שימי לב: אנחנו שולחים את אובייקט current שמכיל את: 
            // personal, family, course, bank
            const response = await api.post('/requests', {
                personal: current.personal,
                family: current.family,
                course: current.course,
                bank: current.bank
            });

            if (response.status === 201) {
                console.log("הבקשה נשמרה בשרת!");
                
                // 3. עדכון ה-Redux המקומי (אופציונלי, תלוי אם את צריכה את זה בסטייט)
                dispatch(add(response.data.request)); 
                
                swal("","הבקשה נשלחה בהצלחה!","success");
                navigate('/Home');
            }
        } catch (error) {
            console.error("שגיאה בשליחת הטופס:", error);
            swal("",error.response?.data?.message || "קרתה שגיאה בשליחת הנתונים לשרת","error");
        }
    };

    return <>
        <div className="submit-container">
            <h2>האם הנך מאשר את שליחת הנתונים</h2>
            
            {/* ⬅️ כפתור אישור מושבת אם הטופס אינו מלא */}
            <button 
                onClick={permit} 
                disabled={!isFormComplete} 
                className={isFormComplete ? 'permit-btn' : 'disabled-btn'}
                type="button"
            >
                אישור
            </button>
            
            <button onClick={cancel} type="button" className="cancel-btn">ביטול</button>
            
            {/* ⬅️ הודעה למשתמש אם חסרים נתונים */}
            {!isFormComplete && (
                <p style={{ color: '#dc3545', fontWeight: 'bold', marginTop: '15px' }}>
                    **יש למלא את כל שדות החובה בטופס כדי לאשר את השליחה.**
                </p>
            )}
        </div>
    </>
}