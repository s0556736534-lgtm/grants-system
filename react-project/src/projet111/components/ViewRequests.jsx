import { useSelector, useDispatch } from "react-redux" // ** הוספתי useDispatch **
import { selectNotAllowed, setAsksList } from "../redux/requestSlice" // ** הוספתי setAsksList **
// import swal from 'sweetalert'
import { useNavigate } from "react-router"
import { useEffect } from "react" 
import api from "../api"
export const ViewRequests = () => {
    const allrequests = useSelector(selectNotAllowed)
    const current = useSelector(s => s.users.current)
    const navigate = useNavigate()
    const dispatch = useDispatch() // ** אתחול ה-dispatch **
    // --- משיכת הנתונים מהשרת ברענון ---
    useEffect(() => {
        const fetchAll = async () => {
            // רק אם המשתמש הוא מנהל, ננסה להביא את כל הבקשות
            if (current && current.isManager) {
                try {
                    const response = await api.get('/requests/all'); // ודאי שזה הנתיב בשרת שלך
                    dispatch(setAsksList(response.data));
                } catch (err) {
                    console.error("Failed to fetch requests:", err);
                }
            }
        };
        fetchAll();
    }, [current, dispatch]); 
    // ------------------------------------------

    // בדיקת הרשאות
    if (!current || !current.isManager) {
        // שימוש ב-useEffect עבור ניווט והודעות כדי למנוע שגיאות רינדור
        return null; 
    }

    // הצגת התוכן למנהל
    console.log("allrequests :", allrequests);
    const showReqests = (id) => { 
        navigate(`/RequestDetails`, { state: { id: id } }) 
    }
    return <>
        <div className="admin-requests-container">
            <h2>📜 בקשות פתוחות לטיפול מנהל</h2>

            {allrequests.length === 0 ? (
                <p className="no-requests">אין בקשות פתוחות לטיפול כרגע.</p>
            ) : (
                <table className="requests-table">
                    <thead> 
                        <tr>
                            <th>מזהה בקשה (ID)</th>
                            <th>שם השולח</th>
                            <th>סטטוס נוכחי</th>
                            <th>פעולה</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allrequests.map((item,index) => (
                            <tr key={item._id}>
                                <td><span className="request-id">{index + 1}</span></td>
                                <td>{item.student ? `${item.student.firstName} ${item.student.lastName}` : 'לא ידוע'}</td>
                                <td>
                                    <span
                                        className={`status-badge status-${(item.status && item.status.replace(/\s/g, '-')) || ''}`}
                                    >
                                        {item.status || 'לא הוגדר'}
                                    </span>
                                </td>
                                <td>
                                    <button
                                    onClick={() => navigate('/RequestDetails', { state: { id: item.id || item._id, index: index + 1 } })}
                                        // onClick={() => showReqests(item._id)}
                                        className="action-btn"
                                    >
                                        עדכן סטטוס
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    </>
}