import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { update } from "../redux/requestSlice"

export const PersonalDetails = ({ onNext }) => {
    const dispatch = useDispatch();
    
    // שליפת נתונים מהרידקס
    const currentPersonal = useSelector(state => state.requests.current.personal);
    const currentUser = useSelector(state => state.users.current);

    const initialPersonalState = {
        tz: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        adress: "",
        phoneNumber: "",
        email: ""
    };

    // 1. הגדרת ה-State (חייב להיות לפני ה-useEffect)
    const [personal, setPersonal] = useState(initialPersonalState);
    const [errors, setErrors] = useState({});

    // 2. אפקט אחד מרכזי שטוען נתונים לפי סדר עדיפויות
    useEffect(() => {
        // עדיפות 1: אם כבר מילאו פרטים בטופס הזה וחזרו אליו (מהרידקס של הבקשה)
        if (currentPersonal && Object.keys(currentPersonal).length > 1) {
            setPersonal(currentPersonal);
        } 
        // עדיפות 2: אם הטופס ריק, קח פרטים מהמשתמש המחובר (מהרידקס של המשתמש)
        else if (currentUser) {
            setPersonal(prev => ({
                ...prev,
                tz: currentUser.tz || "",
                firstName: currentUser.firstName || "",
                lastName: currentUser.lastName || ""
            }));
        }
    }, [currentUser, currentPersonal]); 

    const checkId = (value) => {
        if (!value || value.length !== 9 || isNaN(value)) return false;
        let sum = 0, incNum;
        for (let i = 0; i < value.length; i++) {
            incNum = Number(value[i]) * ((i % 2) + 1);
            sum += (incNum > 9) ? incNum - 9 : incNum;
        }
        return sum % 10 === 0;
    }

    const validate = () => {
        const newErrors = {};
        let isValid = true;
        
        if (!checkId(personal.tz)) {
            newErrors.tz = "תעודת זהות אינה תקינה.";
            isValid = false;
        }
        if (!personal.firstName || personal.firstName.trim().length < 2) {
            newErrors.firstName = "שם פרטי חובה.";
            isValid = false;
        }
        if (!personal.lastName || personal.lastName.trim().length < 2) {
            newErrors.lastName = "שם משפחה חובה.";
            isValid = false;
        }
        if (!personal.dateOfBirth) {
            newErrors.dateOfBirth = "תאריך לידה חובה.";
            isValid = false;
        }
        if (!personal.adress || personal.adress.length < 5) {
            newErrors.adress = "כתובת חובה.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const sendPersonal = () => {
        if (validate()) {
            dispatch(update({ typeForm: "personal", data: personal }));
            if (onNext) onNext();
        }
    }

    return (
        <div className="details-form-container">
            <h5>תעודת זהות</h5>
            <input 
                value={personal.tz} 
                onChange={e => setPersonal({...personal, tz: e.target.value})}
                className={errors.tz ? 'input-error' : ''}
                disabled={!!currentUser?.tz} // חוסם עריכה אם הגיע מהמשתמש
            />
            {errors.tz && <div className="error-message">{errors.tz}</div>}

            <h5>שם פרטי</h5>
            <input 
                value={personal.firstName} 
                onChange={e => setPersonal({...personal, firstName: e.target.value})}
                className={errors.firstName ? 'input-error' : ''}
            />
            {errors.firstName && <div className="error-message">{errors.firstName}</div>}

            <h5>שם משפחה</h5>
            <input 
                value={personal.lastName} 
                onChange={e => setPersonal({...personal, lastName: e.target.value})}
                className={errors.lastName ? 'input-error' : ''}
            />
            {errors.lastName && <div className="error-message">{errors.lastName}</div>}

            <h5>תאריך לידה</h5>
            <input 
                type="date" 
                value={personal.dateOfBirth} 
                onChange={e => setPersonal({...personal, dateOfBirth: e.target.value})}
                className={errors.dateOfBirth ? 'input-error' : ''}
            />
            {errors.dateOfBirth && <div className="error-message">{errors.dateOfBirth}</div>}

            <h5>כתובת</h5>
            <input 
                value={personal.adress} 
                onChange={e => setPersonal({...personal, adress: e.target.value})}
                className={errors.adress ? 'input-error' : ''}
            />
            {errors.adress && <div className="error-message">{errors.adress}</div>}

            <h5>טלפון</h5>
            <input 
                value={personal.phoneNumber} 
                onChange={e => setPersonal({...personal, phoneNumber: e.target.value})}
                className={errors.phoneNumber ? 'input-error' : ''}
            />
            {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}

            <h5>אימייל</h5>
            <input 
                type="email"
                value={personal.email} 
                onChange={e => setPersonal({...personal, email: e.target.value})}
                className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
            
            <br/>
            <button onClick={sendPersonal} type="button">אישור</button>
        </div>
    );
}