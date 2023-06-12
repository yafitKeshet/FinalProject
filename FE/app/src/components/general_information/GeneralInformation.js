import "./GeneralInformation.css";
import Card from "../UI/Card";
import { useState } from "react";
import Separator from "../UI/Separator";

const GeneralInformation = (props) => {
  const [facultiesInfo, setFacultiesInfo] = useState({
    computerScience: false,
    economy: false,
    psychology: false,
    social: false,
  });
  const computerScienceHandler = () => {
    setFacultiesInfo((prev) => {
      return { ...prev, computerScience: !prev.computerScience };
    });
  };
  const economyHandler = () => {
    setFacultiesInfo((prev) => {
      return { ...prev, economy: !prev.economy };
    });
  };
  const psychologyHandler = () => {
    setFacultiesInfo((prev) => {
      return { ...prev, psychology: !prev.psychology };
    });
  };
  const socialHandler = () => {
    setFacultiesInfo((prev) => {
      return { ...prev, social: !prev.social };
    });
  };
  return (
    <>
      <div className="about">
        <h2 className="generalInfo-title">למה באקדמית?</h2>
        <div className="about-contents flex">
          <img src="./aboutImg.jpg" alt="תמונה של המכללה" />
          <h5>
            באקדמית תל-אביב-יפו, אנו מאמינים שהסטודנטים אינם צריכים לעמוד בפני
            בחירה בין אוניברסיטה שמקיימת רמת לימודים גבוהה ומאתגרת בדרישות
            מחמירות, לבין מכללה השמה דגש על מיצוי הפוטנציאל האישי של הסטודנטים,
            ולכן החלטנו לגשר על הפערים וליצור חווית לימודים המשלבת בין שני
            העולמות. <br />
            אנו רואים את ההשכלה הגבוהה ומיצוי הפוטנציאל של הסטודנט בחשיבות רבה,
            ומבקשים מהסטודנטים שלנו לא להתפשר על דבר החל מרגע ההרשמה ועד לקבלת
            התואר.
          </h5>
        </div>
        <div className="about-contents">
          <h2 className="generalInfo-sub-title">דרישות של אוניברסיטה </h2>
          <h5>
            באקדמית תל-אביב-יפו לא מתפשרים על האיכות. דרישות הקבלה שלנו גבוהות
            על מנת לאפשר רמת לימודים גבוהה.
            <br /> אנו מאמינים שרמת לימודים גבוהה וסגל אקדמי בכיר ומעודכן במחקר
            ובעולם המעשה, הם תנאים הכרחיים להצלחתם של הסטודנטים והשתלבותם בשוק
            העבודה ובלימודים מתקדמים בצורה הטובה ביותר. שכר הלימוד באקדמית הוא
            שכר לימוד אוניברסיטאי.
          </h5>
        </div>
        <div className="about-contents">
          <h2 className="generalInfo-sub-title"> חוויה של מכללה </h2>
          <h5>
            באקדמית תל-אביב-יפו מאמינים בחשיבות היחס האישי, מתוך ראייה שכל
            סטודנט הוא עולם בפני עצמו.
            <br /> מדיניות ה"דלת הפתוחה" שמקוימת ע"י כלל הסגל , כיתות הלימוד
            הקטנות והליווי הצמוד יבטיחו שכל סטודנט ימצה את הפוטנציאל הטמון בו.{" "}
            <br />
            אנו רואים בסטודנטים שלנו חלק ממשפחת האקדמית. במשפחה כמו במשפחה, אנו
            מלווים ותומכים בסטודנטים, גם בתחום המיומנויות הרכות כגון : יזמות
            עסקית וחברתית, דיבייט, עבודות צוות, פרזנטציות ועוד.. ובבוגרים שלנו
            גם לאחר סיום התואר ומסייעים להם בניהול הקריירה החדשה אותה החלו ברגע
            שהחליטו ללמוד באקדמית.
          </h5>
        </div>
        <div className="about-contents">
          <h2 className="generalInfo-sub-title">
            יתרונות האקדמית תל-אביב-יפו:
          </h2>
          <ul>
            <li>
              <h5>
                <b>כיתות קטנות </b>
              </h5>
              <p>
                על מנת ליצור אווירה חמה וביתית וקרקע פורייה יותר להצלחה, הלימוד
                ב"אקדמית" מתבצע בכיתות עם מספר מצומצם יחסית של סטודנטים.
              </p>
            </li>
            <li>
              <h5>
                <b>שכר לימוד </b>
              </h5>
              <p>
                שכר הלימוד זהה לשכר הלימוד הנהוג באוניברסיטאות, כמו כן מוענקות
                מלגות הצטיינות, מלגות סיוע כלכלי ומלגות עבור מעורבות חברתית.
              </p>
            </li>
            <li>
              <h5>
                <b>מרכז לניהול קריירה וקשרי בוגרים </b>
              </h5>
              <p>
                באקדמית פועל מרכז לניהול קריירה וקשרי בוגרים. במסגרת המרכז
                מקבלים הסטודנטים והבוגרים כלים יישומים אשר מסייעים בהשתלבותם
                בשוק העבודה התחרותי.{" "}
              </p>
            </li>
            <li>
              <h5>
                <b>רמה אקדמאית גבוהה</b>
              </h5>
              <p>
                רמת לימודים אקדמית גבוהה, חתכי קבלה גבוהים ותנאי סף קפדניים
                להרשמה (בגרות וציון פסיכומטרי) מאפיינים את האקדמית מיום הקמתה
                ועד היום. בנוסף, בסקרי הערכת איכות של המועצה להשכלה גבוהה,
                האקדמית קיבלה הערכות גבוהות ביותר וחיוביות על רמת הלימודים בה.
                סגל מרצים דינמי שאוהב את עבודתו, אנשי אקדמיה המעורבים בשוק
                העבודה בארץ. באקדמית מתקיימים לימודי תואר שני במדעי המחשב,
                פסיכולוגיה, מנהל עסקים וייעוץ ופיתוח ארגוני.
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div></div>
      <div className="faculties">
        <h2 className="generalInfo-title"> יחידות אקדמאיות</h2>
        <div className="faculties-grid">
          <Card className="faculty" id="com" onClick={computerScienceHandler}>
            {!facultiesInfo.computerScience && (
              <>
                <img
                  src="./computerScienceImg.jpg"
                  className="faculty-img"
                  alt="תמונה של מדעי המחשב"
                />
                <h2 className="generalInfo-sub-title">מדעי המחשב</h2>
              </>
            )}
            {facultiesInfo.computerScience && (
              <>
                <header className="faculty-header">
                  <h2>מדעי המחשב</h2>
                </header>
                <Separator />
                <div className="faculty-contents">
                  <h5>
                    המכללה האקדמית ת"א יפו מציעה תואר ראשון במדעי המחשב במגוון
                    התמחויות, וכן תואר שני MSc עם או בלי תזה.
                    <br />
                    קיימות אפשרויות שילוב רבות בין החטיבות השונות: מדעי הנתונים,
                    תקשורת ואינטרנט, הנדסת תוכנה ומערכות וכו'.
                  </h5>
                </div>
              </>
            )}
          </Card>
          <Card className="faculty" onClick={economyHandler}>
            {!facultiesInfo.economy && (
              <>
                <img
                  src="./economyImg.jpg"
                  className="faculty-img"
                  alt="תמונה של כלכלה "
                />
                <h2 className="generalInfo-sub-title">כלכלה </h2>
              </>
            )}
            {facultiesInfo.economy && (
              <>
                <header className="faculty-header">
                  <h2>כלכלה </h2>
                </header>
                <Separator />
                <div className="faculty-contents">
                  <h5>
                    בית הספר מעניק לסטודנט תשתית תיאורטית רחבה ומעמיקה יחד עם
                    כלים יישומיים, במתכונת המבוססת על המודל המקובל באוניברסיטאות
                    המובילות בארה"ב ללימודי תואר ראשון בכלכלה יישומית וניהול
                    (Applied Economics and Management).
                  </h5>
                </div>
              </>
            )}
          </Card>
          <Card className="faculty" onClick={psychologyHandler}>
            {!facultiesInfo.psychology && (
              <>
                <img
                  src="./psychologyImg.jpg"
                  className="faculty-img"
                  alt="תמונה של פסיכולוגיה "
                />
                <h2 className="generalInfo-sub-title">פסיכולוגיה </h2>
              </>
            )}
            {facultiesInfo.psychology && (
              <>
                <header className="faculty-header">
                  <h2>פסיכולוגיה </h2>
                </header>
                <Separator />
                <div className="faculty-contents">
                  <h5>
                    התכנית לתואר ראשון בפסיכולוגיה מספקת לסטודנט תשתית עיונית
                    ומתודולוגית רחבה ומעמיקה, ומכשירה אותו להמשך לימודים לתארים
                    מתקדמים בכל תחום שיבחר בו.
                    <br /> כמו גם להשתלבות בשוק העבודה במגוון עיסוקים בעלי ביקוש
                    גבוה.
                  </h5>
                </div>
              </>
            )}
          </Card>
          <Card className="faculty" onClick={socialHandler}>
            {!facultiesInfo.social && (
              <>
                <img
                  src="./socialImg.png"
                  className="faculty-img"
                  alt="תמונה של סוציולוגיה "
                />
                <h2 className="generalInfo-sub-title">סוציולוגיה </h2>
              </>
            )}
            {facultiesInfo.social && (
              <>
                <header className="faculty-header">
                  <h2> סוציולוגיה</h2>
                </header>
                <Separator />
                <div className="faculty-contents">
                  <h5>
                    המסלול מתמקד בתפקיד המרכזי של התקשורת והמדיה בזירה הפוליטית
                    והחברתית ומציע העמקה תיאורטית והתמקצעות בתחומים נדרשים בשוק
                    העבודה כגון ניהול רשתות חברתיות, דוברות, שיווק ויח”צ וניתוח
                    ביג דאטה .
                  </h5>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default GeneralInformation;
