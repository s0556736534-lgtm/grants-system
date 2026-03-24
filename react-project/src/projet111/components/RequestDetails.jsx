// RequestDetails.js (קוד מעודכן)

import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom";
import { allow, reject } from "../redux/requestSlice";
import swal from "sweetalert"
import api from '../api';

export const RequestDetails = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // let { desc: description, price, img: image } = useLocation().state?.data
    const requestId = location.state?.id;
    const asksList = useSelector(state => state.requests.asksList);
    const currentRequest = asksList.find(x => x._id === requestId);
    const requestIndex = location.state?.index;

    if (!currentRequest) {
        return (
            <div className="error-container">
                <h2>❌ שגיאה: פרטי הבקשה לא נמצאו.</h2>
                <p>אנא ודא שה-ID נשלח כראוי או שהבקשה קיימת במערכת.</p>
            </div>
        );
    }

    const handleAction = async (actionCreator) => {
        // 1. קביעת הסטטוס לפי הפונקציה שנשלחה (allow או reject)
        const newStatus = actionCreator.type.includes('allow') ? 'allow' : 'reject';

        try {
            // 2. קריאה לשרת - שימי לב לשימוש ב-_id (עם קו תחתון) כפי שזה מגיע ממונגו
            const response = await api.patch(`/requests/${currentRequest._id}/status`, {
                status: newStatus
            });

            if (response.status === 200) {
                // 3. רק אם השרת אישר, נעדכן את ה-Redux כדי שהמסך יתעדכן
                dispatch(actionCreator(currentRequest));
                swal("עודכן!", "סטטוס הבקשה עודכן בהצלחה", "success");
                navigate('/ViewRequests');
            }
        } catch (err) {
            console.error("שגיאה בעדכון סטטוס:", err);
            swal("שגיאה", "לא ניתן היה לעדכן את הסטטוס. בדקי את הקונסולה.", "error");
        }
    };

    // הצגת פרטי הבקשה
    return <>
        <div className="request-details-page">
            <header className="page-header">
                <h1>פרטי בקשה #<span className="request-id">{requestIndex}</span></h1>
                <div className="status-indicator">
                    סטטוס: <span className={`status-badge status-${currentRequest.status.toLowerCase()}`}>{currentRequest.status}</span>
                </div>
            </header>

            <div className="details-grid">
                {/* 1. פרטים אישיים */}
                <div className="detail-card personal-details">
                    <h3>👤 פרטים אישיים</h3>
                    <DetailItem label="מספר זהות" value={currentRequest.personal?.tz} />
                    <DetailItem label="שם מלא" value={`${currentRequest.personal?.firstName} ${currentRequest.personal?.lastName || ''}`} />
                    <DetailItem label="תאריך לידה" value={currentRequest.personal?.dateOfBirth} />
                    <DetailItem label="כתובת" value={currentRequest.personal?.adress} />
                    <DetailItem label="טלפון" value={currentRequest.personal?.phoneNumber} />
                    <DetailItem label="מייל" value={currentRequest.personal?.email} />
                </div>

                {/* 2. פרטי משפחה */}
                <div className="detail-card family-details">
                    <h3>👨‍👩‍👧‍👦 פרטי משפחה</h3>
                    <DetailItem label="שם האב" value={currentRequest.family?.fatherName} />
                    <DetailItem label="שם האם" value={currentRequest.family?.motherName} />
                    <DetailItem label="מספר הילדים" value={currentRequest.family?.numOfChildren} />
                    <DetailItem label="אחים מעל 19" value={currentRequest.family?.siblings19Plus} />
                </div>

                {/* 3. פרטי המגמה */}
                <div className="detail-card course-details">
                    <h3>🎓 פרטי המגמה</h3>
                    <DetailItem label="שם המגמה" value={currentRequest.course?.course} />
                    <DetailItem label="שכר לימוד שנתי" value={`${currentRequest.course?.paymentLearn} ₪`} />
                    <DetailItem label="מספר שנות לימוד" value={currentRequest.course?.years} />
                </div>

                {/* 4. פרטי בנק */}
                <div className="detail-card bank-details">
                    <h3>🏦 פרטי בנק</h3>
                    <DetailItem label="בעל החשבון" value={currentRequest.bank?.acountOwner} />
                    <DetailItem label="שם הבנק" value={currentRequest.bank?.bankName} />
                    <DetailItem label="מספר סניף" value={currentRequest.bank?.branchNum} />
                    <DetailItem label="מספר חשבון" value={currentRequest.bank?.accountNum} />
                </div>
            </div>

            <div className="action-buttons">
                <button className="allow-btn" onClick={() => handleAction(allow)}>✅ אישור</button>
                <button className="reject-btn" onClick={() => handleAction(reject)}>❌ סרוב</button>
            </div>
        </div>
    </>
}

// רכיב עזר קטן לשורה אחת של פרט
const DetailItem = ({ label, value }) => (
    <p className="detail-item">
        <span className="detail-label">{label}:</span>
        <span className="detail-value">{value}</span>
    </p>
);