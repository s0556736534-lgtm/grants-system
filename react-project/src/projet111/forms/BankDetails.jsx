import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { update } from "../redux/requestSlice" // ⬅️ קוד שלי: הסרתי את 'bank' מהייבוא כי הוא לא קיים באקשנים

export const BankDetails = ({ onNext }) => { // ⬅️ קוד שלי: קבלת onNext
    const currentBank = useSelector(state => state.requests.current.bank)
    const dispatch = useDispatch()
    
    // ⬅️ קוד שלי: אתחול המצב
    const initialBankState = {
        acountOwner: "",
        bankName: "",
        branchNum: "",
        accountNum: ""
    };

    const [bank, setBank] = useState(currentBank || initialBankState);
    const [errors, setErrors] = useState({}); // ⬅️ קוד שלי: מצב לניהול שגיאות

    useEffect(() => {
        if (currentBank)
            setBank({ ...currentBank })
    }, [currentBank])

    // ----------------------------------------------------
    // ⬅️ קוד שלי: פונקציית הולידציה המרכזית לשלב הבנק
    // ----------------------------------------------------
    const validate = () => {
        const newErrors = {};
        let isValid = true;
        
        // בדיקה 1: בעל חשבון (חובה, 2+ תווים)
        if (!bank.acountOwner || bank.acountOwner.trim().length < 2) {
            newErrors.acountOwner = "בעל החשבון הוא שדה חובה.";
            isValid = false;
        }
        
        // בדיקה 2: שם בנק (חובה, בחירה מתוך הרשימה)
        if (!bank.bankName || bank.bankName === "") {
            newErrors.bankName = "יש לבחור שם בנק מהרשימה.";
            isValid = false;
        }

        // בדיקה 3: מספר סניף (3-5 ספרות)
        const branchNumRegex = /^\d{3,5}$/;
        if (!branchNumRegex.test(bank.branchNum)) {
            newErrors.branchNum = "מספר סניף לא תקין (3-5 ספרות).";
            isValid = false;
        }

        // בדיקה 4: מספר חשבון (6-12 ספרות)
        const accountNumRegex = /^\d{6,12}$/;
        if (!accountNumRegex.test(bank.accountNum)) {
            newErrors.accountNum = "מספר חשבון לא תקין (6-12 ספרות).";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const sendBank = () => {
        if (validate()) { // ⬅️ קוד שלי: בדיקת תקינות
            dispatch(update({ typeForm: "bank", data: bank }));
            if (onNext) onNext(); // ⬅️ קוד שלי: מעבר לשלב הבא
        } else {
            console.log("Validation Failed for Bank Details.");
        }
    }

    return (
        <div className="details-form-container">
            <h3>פרטי בנק</h3>

            <h5>בעל חשבון</h5>
            <input 
                value={bank.acountOwner} 
                onChange={e => {setBank({ ...bank, acountOwner: e.target.value })}}
                className={errors.acountOwner ? 'input-error' : ''}
                type="text"
            />
            {errors.acountOwner && <div className="error-message">{errors.acountOwner}</div>}

            <h5>שם בנק</h5>
            <select 
                value={bank.bankName} 
                onChange={e => {setBank({ ...bank, bankName: e.target.value })}}
                // className={errors.bankName ? 'input-error' : ''}
            >
                <option value="" disabled selected>בחר בנק</option> {/* ⬅️ קוד שלי: הוספת value="" ואופציה לבחירה */}
                <option>בנק מזרחי</option>
                <option>בנק הפועלים</option>
                <option>בנק הדואר</option>
                <option>בנק פאגי</option>
                {/* ⬅️ קוד שלי: ניתן להוסיף בנקים נוספים לפי הצורך */}
            </select>
            {errors.bankName && <div className="error-message">{errors.bankName}</div>}

            <h5>מספר סניף</h5>
            <input 
                type="number" 
                value={bank.branchNum} 
                onChange={e => {setBank({ ...bank, branchNum: e.target.value })}}
                className={errors.branchNum ? 'input-error' : ''}
            />
            {errors.branchNum && <div className="error-message">{errors.branchNum}</div>}

            <h5>מספר חשבון</h5>
            <input 
                type="number" // ⬅️ קוד שלי: שינוי ל-type="number"
                value={bank.accountNum} 
                onChange={e => {setBank({ ...bank, accountNum: e.target.value })}}
                className={errors.accountNum ? 'input-error' : ''}
            />
            {errors.accountNum && <div className="error-message">{errors.accountNum}</div>}

            <br />
            <button onClick={sendBank} type="button">אישור</button>
        </div>
    )
}