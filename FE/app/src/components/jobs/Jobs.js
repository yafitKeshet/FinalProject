import React, { useState } from "react";
import "./Jobs.css";
import Job from "./Job";
import Card from "../UI/Card";
import JobsList from "./JobsList";
import JobsICN from "../UI/SVG/JobsICN";

const tempJobs = [
  {
    job_id: "1",
    publisher_email: "yafitmi@mta.ac.il",
    published_time: "21-06-2023",
    applies: 0,
    title: "גוגל מחפשת עובדים",
    time_required: "FullTime",
    description: "תיאוררררררררררר",
    company: {
      name: "google",
      logo: "./companies/googleLogo.png",
      number_of_employees: ["50", "100"],
    },
    faculty_relevance: "ComputerScience",
    experience: "Junior",
  },
  {
    job_id: "2",
    publisher_email: "yaftmi@mta.ac.il",
    published_time: "21-06-2023",
    applies: 0,
    title: "גוגל מחפשת עובדים",
    time_required: "FullTime",
    description: "תיאוררררררררררר",
    company: {
      name: "google",
      logo: "./companies/googleLogo.png",
      number_of_employees: ["50", "100"],
    },
    faculty_relevance: "ComputerScience",
    experience: "Junior",
  },
  {
    job_id: "3",
    publisher_email: "yafitmi@mta.ac.il",
    published_time: "21-06-2023",
    applies: 0,
    title: "גוגל מחפשת עובדים",
    time_required: "FullTime",
    description: "תיאוררררררררררר",
    company: {
      name: "google",
      logo: "./companies/googleLogo.png",
      number_of_employees: ["50", "100"],
    },
    faculty_relevance: "ComputerScience",
    experience: "Junior",
  },
];

const Jobs = (props) => {
  //TODO
  const getJobs = () => {};

  const [openJobId, setOpenJobId] = useState(tempJobs[0].job_id);
  console.log(openJobId);

  return (
    <div className="jobs">
      <Card className="jobs-card">
        <JobsICN className="jobs-icon" />
        <div className="open-job">
          {tempJobs.map((job) => (
            <Job
              isOpen={openJobId === job.job_id}
              user={props.user}
              job_id={job.job_id}
              publisher_email={job.publisher_email}
              published_time={job.published_time}
              applies={job.applies}
              title={job.title}
              time_required={job.time_required}
              description={job.description}
              company={job.company}
              faculty_relevance={job.faculty_relevance}
              experience={job.experience}
              key={Math.random()}
              onDeleteJob={getJobs}
            />
          ))}
        </div>
        <JobsList items={tempJobs} />
      </Card>
    </div>
  );
};
export default Jobs;
