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
    <div className="faculties">
      <h2 className="faculty-title"> יחידות אקדמאיות</h2>
      <div className="faculties-grid">
        <Card className="faculty" id="com" onClick={computerScienceHandler}>
          {!facultiesInfo.computerScience && (
            <>
              <img
                src="./computerScienceImg.jpg"
                className="faculty-img"
                alt="תמונה של מדעי המחשב"
              />
              <h2 className="faculty-sub-title">מדעי המחשב</h2>
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
              <h2 className="faculty-sub-title">כלכלה </h2>
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
                  בית הספר מעניק לסטודנט תשתית תיאורטית רחבה ומעמיקה יחד עם כלים
                  יישומיים, במתכונת המבוססת על המודל המקובל באוניברסיטאות
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
              <h2 className="faculty-sub-title">פסיכולוגיה </h2>
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
              <h2 className="faculty-sub-title">סוציולוגיה </h2>
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
  );
};

export default GeneralInformation;
