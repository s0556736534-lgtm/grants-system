
 import '../style.css'; // ייבוא קובץ ה-CSS עבור העיצוב
import { ViewStatus } from './ViewStatus';
import { SendRequest } from './SendRequest';
import { useNavigate } from 'react-router-dom';

/**
 * רכיב דף הבית של המערכת לבקשות מענק.
 * מציג מידע כללי ואפשרויות ניווט מרכזיות.
 */
export const Home= ()=>{
    let nav = useNavigate()
  return <>
    <div className="home-container">
      {/* כותרת ראשית */}
      <header className="home-header">
        <h1>מערכת הגשת בקשות למענקים לסטודנטים</h1>
        <p className="subtitle">הדרך הפשוטה והיעילה לקבלת תמיכה כלכלית</p>
      </header>

      {/* אזור תוכן מרכזי - אודות ומידע */}
      <section className="home-content">
        
        {/* אודות האתר והפרויקט */}
        <div className="about-section">
          <h2>📚 אודות המערכת</h2>
          <p>
            מערכת זו פותחה כדי לייעל את תהליך הגשת הבקשות למענקים לסטודנטים. 
            מטרתנו היא להבטיח שכל סטודנט הזכאי לסיוע יוכל להגיש בקשה בקלות,
            לצרף את כל המסמכים הנדרשים ולעקוב אחר סטטוס הטיפול בבקשתו,
            בצורה שקופה ומסודרת.
          </p>
          <p>
            המערכת מפחיתה את הצורך בניירת ומאפשרת טיפול מהיר וממוחשב בבקשות.
          </p>
        </div>

        {/* קריאה לפעולה (Call to Action) */}
        <div className="cta-section">
          <h2>🚀 התחל כאן</h2>
          <div className="cta-buttons">
            {/* כפתור להגשת בקשה חדשה */}
            {/* נניח שיש לנו ניתוב (routing) לרכיב 'NewRequest' */}
            <button 
              className="btn primary-btn" 
              onClick={() =>nav('/SendRequest')}
            >
              הגשת בקשה חדשה
            </button>
            
            {/* כפתור לבדיקת סטטוס בקשה קיימת */}
            {/* נניח שיש לנו ניתוב (routing) לרכיב 'StatusCheck' */}
            <button 
              className="btn secondary-btn"
              onClick={() => nav('/ViewStatus')}
            >
              בדיקת סטטוס בקשה
            </button>
          </div>
        </div>
        
        {/* מידע נוסף או קישורים שימושיים */}
        <div className="info-section">
          <h3>🔗 מידע חשוב</h3>
          <ul>
            <li>תנאי זכאות והנחיות</li>
            <li>שאלות נפוצות (FAQ)</li>
            <li>צור קשר</li>
          </ul>
        </div>
      </section>

      {/* כותרת תחתונה */}
      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} מערכת מענקים | פותח כחלק מפרויקט גמר</p>
      </footer>
    </div>
  </>
}

 export default Home;