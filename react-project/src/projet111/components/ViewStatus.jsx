import { useNavigate } from 'react-router'
import swal from 'sweetalert'
import { useEffect, useState } from 'react' 
import './styleStatusMassage.css'
import { useSelector, useDispatch } from 'react-redux' 
import { setAsksList } from '../redux/requestSlice' 
import api from '../api'

export const ViewStatus = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const current = useSelector(state => state.users.current);
    const allrequests = useSelector(state => state.requests.asksList);
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            // בדיקה: האם המשתמש בכלל קיים ובשלב הנכון?
            if (!current) {
                setIsLoading(false);
                return;
            }

            // אם המשתמש מחובר אבל חסר לו TZ (קורה לפעמים בגלל באג ברישום/לוגין)
            // if (!current.tz) {
            //     console.error("User exists but tz is missing", current);
            //     setIsLoading(false);
            //     return;
            // }

            try {
                setIsLoading(true);
                // וודאי שהנתיב בשרת הוא אכן /requests/my-requests ולא /requests/my
                const response = await api.get('/requests/my-requests');
                dispatch(setAsksList(response.data));
            } catch (err) {
                console.error("שגיאה במשיכת בקשות:", err);
            } finally {
                // זה החלק הכי חשוב - תמיד מפסיקים את הטעינה בסוף
                setIsLoading(false);
            }
        };

        fetchRequests();
    }, [current, dispatch]);

    // בדיקת התחברות
    useEffect(() => {
        if (current === null) {
            swal('אזהרה', 'עליך תחילה להתחבר', 'error').then(() => navigate('/Login'));
        }
    }, [current, navigate]);

    // רינדור
    if (isLoading) {
        return <div className="status-container"><div className="loader">⏳ בודק נתונים במערכת...</div></div>;
    }

    if (!current) return null;

    if (!allrequests || allrequests.length === 0) {
        return (
            <div className="status-container">
                <h1>לא נמצאה בקשה התואמת לפרטיך</h1>
                <button onClick={() => navigate('/SendRequest')} className="btn">להגשת בקשה חדשה</button>
            </div>
        );
    }

    const lastRequestStatus = allrequests[allrequests.length - 1]?.status;

    return (
        <div className="status-container">
            {/* <h2>שלום {current.firstName},</h2> */}
            {lastRequestStatus === "pending" || lastRequestStatus === "waiting" ? (
                <h1 className="status-pending">⏳ הבקשה שלך עדיין ממתינה לבדיקה</h1>
            ) : lastRequestStatus === "allow" ? (
                <h1 className="status-allow">✅ הבקשה שלך אושרה!</h1>
            ) : lastRequestStatus === "reject" ? (
                <h1 className="status-reject">❌ מצטערים, הבקשה שלך נדחתה.</h1>
            ) : (
                <h1>סטטוס: {lastRequestStatus}</h1>
            )}
        </div>
    );
}