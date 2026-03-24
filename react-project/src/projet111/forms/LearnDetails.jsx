import { useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { update } from "../redux/requestSlice"

// 💡 הרכיב מקבל onNext מהרכיב האב (MultiForm)
export const LearnDetails = ({ onNext }) => { // **נוסף onNext כ-props**
    const currentCourse = useSelector(state => state.requests.current.course)
    const dispatch = useDispatch()
    
    const [course, setCourse]= useState(currentCourse || { // **נוסף אתחול מ-currentCourse**
        course: "",
        paymentLearn: "",
        years: ""
    })
    
    // **הוספת מצב לשגיאות**
    const [errors, setErrors] = useState({});
    
    useEffect(() => {
        if(currentCourse)
            setCourse({...currentCourse})
    },[currentCourse])
    
    // ----------------------------------------------------
    // **הוספת פונקציית הולידציה המרכזית לשלב הלימודים**
    // ----------------------------------------------------
    const validate = () => {
        const newErrors = {};
        let isValid = true;
        
        // בדיקה 1: שם המגמה/קורס (חובה, לפחות 2 תווים)
        if (!course.course || course.course.trim().length < 2) {
            newErrors.course = "שם המגמה/קורס הוא שדה חובה.";
            isValid = false;
        }

        // בדיקה 2: שכר לימוד שנתי (חובה, מספר חיובי)
        const payment = parseFloat(course.paymentLearn);
        if (isNaN(payment) || payment <= 0) {
            newErrors.paymentLearn = "שכר לימוד חייב להיות מספר חיובי תקין.";
            isValid = false;
        }

        // בדיקה 3: שנות לימוד (חובה, מספר שלם בין 1 ל-10)
        const years = parseInt(course.years);
        if (isNaN(years) || years < 1 || years > 10) {
            newErrors.years = "שנות לימוד חייבות להיות מספר שלם בין 1 ל-10.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }
    
    const sendCourse = () => {
        // **קריאה לפונקציית הולידציה לפני הדיספאץ' והמעבר לשלב הבא**
        if (validate()) {
            dispatch(update({typeForm: "course",data: course}))
            console.log(course);
            if (onNext) onNext(); // **מעבר לשלב הבא רק אם הולידציה עברה**
        } else {
            console.log("Validation Failed for Learn Details.");
        }
    }
    
    return(
        <div className="details-form-container"> {/* **הוספת קלאס לעיצוב אחיד** */}
            <h3>פרטי לימודים</h3> {/* **הוספת כותרת** */}
            
            <h5>מגמה</h5>
            <input 
                value={course.course} 
                onChange={e=>{setCourse({...course,course: e.target.value})}}
                // **הוספת קלאס לשגיאה**
                className={errors.course ? 'input-error' : ''}
            />
            {/* **הצגת הודעת שגיאה** */}
            {errors.course && <div className="error-message">{errors.course}</div>}

            <h5>שכר לימוד שנתי</h5>
            <input 
                type="number" 
                value={course.paymentLearn} 
                onChange={e=>{setCourse({...course,paymentLearn: e.target.value})}}
                // **הוספת קלאס לשגיאה**
                className={errors.paymentLearn ? 'input-error' : ''}
            />
            {/* **הצגת הודעת שגיאה** */}
            {errors.paymentLearn && <div className="error-message">{errors.paymentLearn}</div>}

            <h5>שנות לימוד</h5>
            <input 
                type="number" 
                value={course.years} 
                onChange={e=>{setCourse({...course,years: e.target.value})}}
                // **הוספת קלאס לשגיאה**
                className={errors.years ? 'input-error' : ''}
            />
            {/* **הצגת הודעת שגיאה** */}
            {errors.years && <div className="error-message">{errors.years}</div>}

            <br/>
            <button onClick={sendCourse} type="button">אישור</button> {/* **שינוי ל-type="button"** */}
        </div>
    )
}