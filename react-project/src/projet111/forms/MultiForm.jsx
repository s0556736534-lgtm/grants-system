import react, { useState } from "react"

export const MultiForm = (props) => {

    // ⬅️ קוד שלי: מניית רכיבי הילד שהועברו (שלבי הטופס)
    let steps = react.Children.toArray(props.children)

    // ⬅️ קוד שלי: המצב הנוכחי המציין את מספר השלב (מ-0)
    const [num, setNum] = useState(0)

    // ----------------------------------------------------
    // ⬅️ קוד שלי: פונקציה לעיבוד ה-onNext מתוך רכיבי השלב
    // הפונקציה הזו תועבר כ-prop onNext לכל רכיב Details
    // כדי לאפשר להם להתקדם אוטומטית רק לאחר אישור הנתונים שלהם.
    const handleNextStep = () => {
        next();
    }
    // ----------------------------------------------------


    const prev = () => {
        if (num > 0) {
            setNum(num - 1)
        }
    }

    const next = () => {
        // מונע התקדמות מעבר לשלב האחרון
        if (num < steps.length - 1) {
            setNum(num + 1)
        }
    }

    const currentChild = () => {
        // ⬅️ שיפור: שולח את הפרופ onNext לרכיבי השלב 
        // ומעביר את onCancel/onSubmit רק לרכיב Submit
        const additionalProps = {};

        // אם זה שלב ביניים, שלח את onNext.
        // אם זה השלב האחרון (שלב השליחה), שלח את onCancel ו-onSubmit 
        // (בהנחה שרכיב Submit/השלב האחרון הוא ב-index steps.length - 1).

        if (num < steps.length - 1) {
             // שולח את הפונקציה next לרכיבי ה-Details כדי שיקראו לה לאחר ולידציה מוצלחת
            additionalProps.onNext = handleNextStep;
        } 
        
        // הערה: יש לשלוח את onCancel/onSubmit ישירות לרכיב ה-Submit אם הוא השלב האחרון.

        return react.cloneElement(steps[num], additionalProps)
    }

    // ⬅️ קוד שלי: בדיקה אם אנחנו בשלב הראשון (Index 0)
    const isFirstStep = num === 0;

    // ⬅️ קוד שלי: בדיקה אם אנחנו בשלב האחרון
    const isLastStep = num === steps.length - 1;

    return (
        <div className={'mainDiv'}>
            <div className='stpDiv'>
                
                {steps.map((x, i) => 
                <button 
                    onClick={() => setNum(i)} 
                    className={`step ${i === num ? 'activeStep' : ''}`} 
                    key={i}
                    // ⬅️ קוד שלי: ניתן להוסיף כאן לוגיקה שתמנע מעבר אחורה לשלב שלא הושלם
                >
                    {i + 1}
                </button>)}
            </div>
            <div className='frmDiv'>
                {currentChild()}
            </div>
            
            {/* ------------------------------------------- */}
            {/* ⬅️ קוד שלי: כפתורי ניווט מותנים */}
            {/* ------------------------------------------- */}
            
            {/* כפתור חזור: מציגים רק אם אנחנו לא בשלב הראשון */}
            {!isFirstStep && ( // ⬅️ הערה: מציג את כפתור "חזור" רק אם num > 0
                <button className='btn' onClick={prev}>חזור</button>
            )}

            {/* כפתור הבא: מציגים רק אם אנחנו לא בשלב האחרון */}
            {!isLastStep && ( // ⬅️ הערה: מציג את כפתור "הבא" רק אם num < steps.length - 1
                <button className='btn' onClick={next}>הבא</button>
            )}
            
            {/* ⬅️ קוד שלי: הערה חשובה: 
                 שלב השליחה (האחרון) לא צריך כפתורי 'הבא/חזור' כי 
                 הוא צריך רק את כפתורי 'אישור/ביטול' שכבר נמצאים ברכיב Submit עצמו.
            */}
        </div>
    )
}