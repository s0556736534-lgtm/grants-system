import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router'
import { setCurrent } from '../redux/userSlice'
import { useState } from "react"
import api from '../api'
import swal from "sweetalert"
export const Login = () => {
    // 1. הגדרת State עם ערכים התחלתיים
    const [user, setUser] = useState({ tz: '', password: '' })
    // const [userCredentials, setUserCredentials] = useState({ tz: '', password: '' });
    // const current = useSelector(state => state.users.current)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const checkUser = async () => {
        // בדיקה קטנה לפני ששולחים - שלא ריק
        if (!user.tz || !user.password) {
            swal("שגיאה", "חובה להזין תעודת זהות וסיסמה", "error");
            return;
        }
        try {
            // שולחים לשרת את פרטי ההתחברות
            const response = await api.post('/auth/login', user);

            if (response.status === 200) {
                // השרת אישר! נשמור את המשתמש ברידקס
                dispatch(setCurrent(response.data.user));
                swal("התחברת בהצלחה", `שלום ${response.data.user.firstName}`, "success");
                navigate('/Home');
            }
        } catch (err) {
            // אם השרת החזיר שגיאה (401/404/500)
            const errorMsg = err.response?.data?.message || "שגיאה בהתחברות";
            swal("שגיאה", errorMsg, "error");

            if (err.response?.status === 404) {
                // אם המשתמש לא נמצא, נציע לו להירשם
                navigate('/Register');
            }
        }
    }
    const register = () => {
        navigate('/Register')
    }
    // export const Login = () => {
    //     const users = useSelector(state => state.users.users)
    //     //console.log(users);

    //     const navigate = useNavigate()
    //     const [user, setUser] = useState()
    //     const dispach = useDispatch()
    //     const current = useSelector(state => state.users.current)

    //     const checkUser = () => {
    //         let flag = true
    //         users.forEach(x => {
    //             if (x.tz == user?.tz && x.password == user?.password && flag) {
    //                 dispach(setCurrent(x))
    //                 flag = false
    //                 navigate('/Home')
    //             }
    //         });
    //         console.log("current: ", current);

    //         if (flag){
    //             navigate('/Register')
    //             dispach(setCurrent(user))
    //         }
    //     }
    //     const register = () => {
    //         navigate('/Register')
    //     }
    return <>
        <div className="auth-page-container">
            <div className="form">
                <form className="login-form" action="" method="post">
                    <i className="fas fa-user-circle"></i>
                    <h2>כניסת משתמש</h2> {/* כותרת נוספת לעיצוב */}
                    <input className="user-input" type="text" name="" placeholder="מספר תעודת זהות" required onBlur={(e) => setUser({ ...user, tz: e.target.value })}></input>
                    <input className="user-input" type="password" name="" placeholder="סיסמה" required onBlur={(e) => setUser({ ...user, password: e.target.value })}></input>

                    <input onClick={checkUser} className="btn" type='button' value="כניסה"></input> {/* שינוי ל-type='button' למניעת ריענון */}

                    <div className="options-02">
                        <a onClick={register}>עדיין לא רשום? צור חשבון</a>
                    </div>
                </form>
            </div>
        </div>
    </>
}
