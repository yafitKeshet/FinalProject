export enum ScreenTypes {
  AppLoader = "appLoader",
  HomeScreen = "homeScreen",
  QuestionScreen = "questionScreen",
  ResultScreen = "resultScreen",
}

export enum ForgetPassStepTypes {
  step1 = "step1- insert mail",
  step2 = "step2- insure mail",
  step3 = "step3- insert code from mail",
  step4 = "step4- create new password & confirm pass",
}

export enum RegisterStepTypes {
  step1 = "step1- insert mail (check if already exist & send confirm code)",
  step2 = "step2- insert code from mail",
  step3 = "step3- insert user data",
}

export enum Faculty {
  ComputerScience = "ComputerScience",
  Economy = "Economy",
  Psychology = "Psychology",
  Social = "Social",
}
export const getFaculty = (faculty) => {
  switch (faculty) {
    case Faculty.ComputerScience:
      return "מדעי המחשב";
    case Faculty.Psychology:
      return "פסיכולוגיה";
    case Faculty.Economy:
      return "כלכלה";
    case Faculty.Social:
      return "סוציולוגיה";
    default:
      return "בחירה";
  }
};

export enum Year {
  First = "First",
  Second = "Second",
  Third = "Third",
  Fourth = "Fourth",
  Fifth = "Fifth",
  Graduated = "Graduated",
}
export const getYear = (year) => {
  switch (year) {
    case Year.First:
      return "שנה ראשונה";
    case Year.Second:
      return "שנה שנייה";
    case Year.Third:
      return "שנה שלישית";
    case Year.Fourth:
      return "שנה רביעית";
    case Year.Fifth:
      return "שנה חמישית";
    case Year.Graduated:
      return "סיים את התואר";
    default:
      return "";
  }
};

export enum Experience {
  Junior = "Junior",
  Senior = "Senior",
  NotRelevant = "NotRelevant",
}
export const getExperience = (experience) => {
  switch (experience) {
    case Experience.Junior:
      return "מתחיל";
    case Experience.Senior:
      return "מנוסה";
    case Experience.NotRelevant:
      return "ללא ניסיון";
    default:
      return "";
  }
};

export enum JobTime {
  FullTime = "FullTime",
  PartTime = "PartTime",
  Student = "Student",
}
export const getJobTime = (jobTime) => {
  switch (jobTime) {
    case JobTime.FullTime:
      return "משרה מלאה";
    case JobTime.PartTime:
      return "משרה חלקית";
    case JobTime.Student:
      return "משרת סטודנט";
    default:
      return "";
  }
};
