import React from "react";
import "./Jobs.css";
import Job from "./Job";
import Card from "../UI/Card";

const Jobs = (props) => {
  const getJobs = () => {};
  const company = {
    name: "google",
    logo: "./companies/googleLogo.png",
    number_of_employees: ["50", "100"],
  };
  return (
    <Card className="jobs-card">
      <Job
        user={props.user}
        job_id="string"
        publisher_email="yafitmi@mta.ac.il"
        published_time="21-06-2023"
        applies={0}
        title="גוגל מחפשת עובדים"
        time_required="FullTime"
        description="תיאוררררררררררר"
        company={company}
        faculty_relevance="ComputerScience"
        experience="Junior"
        key={Math.random()}
        onDeleteJob={getJobs}
      >
        משרות
      </Job>
    </Card>
  );
};
export default Jobs;
