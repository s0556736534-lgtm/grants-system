import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true // שולח אוטומטית את עוגיית ה-Token בכל בקשה
});

export default api;