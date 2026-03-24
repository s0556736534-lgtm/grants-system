import { NavLink, useNavigate } from "react-router"
import { useSelector, useDispatch } from "react-redux"
// import api from '../api';
import { setCurrent, logout } from '../redux/userSlice'
// import { useEffect } from 'react';
import '../style.css'
// import { logout } from '../redux/userSlice';
import { resetRequests } from '../redux/requestSlice';

export const Nav = () => {
    // App.js
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await api.get('/auth/me');
  //       // אם השרת החזיר משתמש, נשמור אותו ב-Redux
  //       dispatch(setCurrent(response.data.user));
  //     } catch (err) {
  //       // אם השרת החזיר שגיאה (אין עוגייה), נבטיח שהסטייט ריק
  //       dispatch(logout());
  //     }
  //   };
  //   checkAuth();
  // }, [dispatch]);


const handleLogout = () => {
    dispatch(logout());          // מנקה את המשתמש
    dispatch(resetRequests());   // מנקה את הבקשות הישנות!
    navigate('/Login');
};
    const c=useSelector(s=>s.users.current)
    return <>
        <div className={'div'}>
            <h1>{c?.firstName} שלום</h1>
            
            <NavLink to='Home' className='link'>דף בית</NavLink>
            <NavLink to='Login' className='link'>כניסה</NavLink>
            <NavLink to='Register' className='link'>הרשמה</NavLink>

            {/* <NavLink to='SendRequest' className='link'> הגשת בקשה למענק</NavLink> */}
            {
                c?.isManager?
                    <NavLink to='ViewRequests' className='link'>הצגת הבקשות</NavLink>
                :
                    null
            }
            <div onClick={handleLogout} className="link">התנתק</div>
            {/* {c?
                <NavLink to='ViewStatus' className='link'>צפיה בסטטוס</NavLink>
            :
                null} */}
        </div>
    </>
}