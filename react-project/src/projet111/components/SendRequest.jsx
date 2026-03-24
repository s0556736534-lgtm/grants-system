import { useNavigate } from 'react-router-dom' // ודאי שזה הנתיב הנכון אצלך
import { LayOut } from '../forms/LayOut'
import swal from 'sweetalert'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

export const SendRequest = () => {
    // שליפת המשתמש הנוכחי מהרידקס
    const current = useSelector(state => state.users.current)
    const navigate = useNavigate()

    useEffect(() => {
        // אם current הוא null, סימן שהמשתמש לא מחובר
        if (!current) {
            swal('אזהרה!', 'עליך תחילה להיכנס או להירשם', 'error')
                .then(() => {
                    navigate('/Login');
                });
        }
    }, [current, navigate]); // ירוץ בכל פעם ש-current משתנה

    // בזמן שהבדיקה מתבצעת או אם אין משתמש, לא נרנדר כלום
    if (!current) {
        return null; 
    }

    return (
        <>
            <LayOut />
        </>
    );
}