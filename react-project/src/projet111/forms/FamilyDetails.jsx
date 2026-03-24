import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { update } from "../redux/requestSlice"

export const FamilyDetails = ({ onNext }) => { // ⬅️ קוד שלי: קבלת onNext
    const currentFamily = useSelector(state => state.requests.current.family)
    const dispatch = useDispatch()
    
    // ⬅️ קוד שלי: אתחול המצב
    const initialFamilyState = {
        fatherName: "",
        motherName: "",
        numOfChildren: "",
        siblings19Plus: ""
    };

    const [family, setFamily] = useState(currentFamily || initialFamilyState);
    const [errors, setErrors] = useState({}); // ⬅️ קוד שלי: מצב לניהול שגיאות

    useEffect(() => {
        if (currentFamily)
            setFamily({ ...currentFamily })
    }, [currentFamily])

    // ----------------------------------------------------
    // ⬅️ קוד שלי: פונקציית הולידציה המרכזית לשלב המשפחה
    // ----------------------------------------------------
    const validate = () => {
        const newErrors = {};
        let isValid = true;
        
        // בדיקה 1: שם האב (חובה, 2+ תווים)
        if (!family.fatherName || family.fatherName.trim().length < 2) {
            newErrors.fatherName = "שם האב הוא שדה חובה.";
            isValid = false;
        }

        // בדיקה 2: שם האם (חובה, 2+ תווים)
        if (!family.motherName || family.motherName.trim().length < 2) {
            newErrors.motherName = "שם האם הוא שדה חובה.";
            isValid = false;
        }

        // בדיקה 3: כמות הילדים (מספר שלם, >= 0)
        const children = parseInt(family.numOfChildren);
        if (isNaN(children) || children < 0) {
            newErrors.numOfChildren = "כמות הילדים חייבת להיות מספר שלם לא שלילי.";
            isValid = false;
        }

        // בדיקה 4: כמות אחים מעל גיל 19 (מספר שלם, >= 0)
        const siblings = parseInt(family.siblings19Plus);
        if (isNaN(siblings) || siblings < 0) {
            newErrors.siblings19Plus = "כמות האחים מעל 19 חייבת להיות מספר שלם לא שלילי.";
            isValid = false;
        }

        // בדיקה 5 (לוגית): כמות האחים מעל 19 לא יכולה להיות גדולה מכמות הילדים הכוללת
        if (children < siblings) {
             newErrors.siblings19Plus = "מספר האחים מעל 19 אינו יכול להיות גדול ממספר הילדים הכולל.";
             isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const sendFamily = () => {
        if (validate()) { // ⬅️ קוד שלי: בדיקת תקינות
            dispatch(update({ typeForm: "family", data: family }));
            if (onNext) onNext(); // ⬅️ קוד שלי: מעבר לשלב הבא
        } else {
            console.log("Validation Failed for Family Details.");
        }
    }

    return (
        <div className="details-form-container">
            <h3>פרטי משפחה</h3>

            <h5>שם האב</h5>
            <input 
                value={family.fatherName} 
                onChange={e => {setFamily({ ...family, fatherName: e.target.value })}}
                className={errors.fatherName ? 'input-error' : ''}
                type="text"
            />
            {errors.fatherName && <div className="error-message">{errors.fatherName}</div>}

            <h5>שם האם</h5>
            <input 
                value={family.motherName} 
                onChange={e => {setFamily({ ...family, motherName: e.target.value })}}
                className={errors.motherName ? 'input-error' : ''}
                type="text"
            />
            {errors.motherName && <div className="error-message">{errors.motherName}</div>}

            <h5>כמות הילדים</h5>
            <input 
                type="number" 
                value={family.numOfChildren} 
                onChange={e => {setFamily({ ...family, numOfChildren: e.target.value })}}
                className={errors.numOfChildren || errors.siblings19Plus ? 'input-error' : ''} // ⬅️ קוד שלי: מציג שגיאה אם הילדים או האחים פגומים
            />
            {errors.numOfChildren && <div className="error-message">{errors.numOfChildren}</div>}

            <h5>כמות אחים מעל גיל 19</h5>
            <input 
                type="number" 
                value={family.siblings19Plus} 
                onChange={e => {setFamily({ ...family, siblings19Plus: e.target.value })}}
                className={errors.siblings19Plus ? 'input-error' : ''}
            />
            {errors.siblings19Plus && <div className="error-message">{errors.siblings19Plus}</div>}

            <br />
            <button onClick={sendFamily} type="button">אישור</button>
        </div>
    )
}