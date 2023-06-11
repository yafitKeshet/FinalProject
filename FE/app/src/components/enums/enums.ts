import axios from "axios";

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

export let faculties = {};
export let jobTime = {};
export let experience = {};
export let year = {};
export let rating = {};

const getEnumsAsync = async () => {
  try {
    let enumsRequest = await axios.get("http://localhost:8080/enums");
    if (enumsRequest !== undefined && enumsRequest.status === 200) {
      console.log("enums: ", enumsRequest.data);
      return enumsRequest.data;
    }
  } catch (err) {
    console.log("error in getting enums");
  }
};
getEnumsAsync().then((enums) => {
  faculties = enums.Faculty;
  jobTime = enums.JobTime;
  experience = enums.Experience;
  year = enums.Year;
  rating = enums.Rating;
});
