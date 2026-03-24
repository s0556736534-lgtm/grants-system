// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import api from './projet111/api'; // הקובץ שיצרנו עם axios
// import { setCurrent, logout } from './projet111/redux/userSlice'; // ודאי שהשמות תואמים ל-Slice שלך
import { Main } from './projet111/Main';

function App() {
  // // App.js
  // const dispatch = useDispatch();
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

  return <div className="App">
    <Main></Main>
  </div>
}
export default App;
