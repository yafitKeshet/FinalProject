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

export enum Faculty {
  ComputerScience = "ComputerScience",
  Economy = "Economy",
  Psychology = "Psychology",
  Social = "Social",
}

export enum Year {
  First = "First",
  Second = "Second",
  Third = "Third",
  Fourth = "Fourth",
  Fifth = "Fifth",
  Graduated = "Graduated",
}
