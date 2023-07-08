import React, { useState, useEffect } from "react";
import "./Jobs.css";
import Job from "./Job";
import Card from "../UI/Card";
import JobsList from "./JobsList";
import JobsICN from "../UI/SVG/JobsICN";
import UploadJob from "./UploadJob";
import { getConfig, getUserProfile } from "../user/user.ts";
import axios from "axios";

const tempJobs = [
  {
    job_id: "1",
    publisher_email: "ohadks@mta.ac.il",
    published_time: "21-06-2023",
    applies: 10,
    title: "אנליסט/ית אשראי – חטיבה עסקית",
    time_required: "FullTime",
    description: `    ניתוח דוחות כספיים וצרכי אשראי של חברות ותאגידים.
    כתיבת ועדות אשראי, בקשות שוטפות, מתן הוראות וביצוע בקרה.
    מימוש החלטות עסקיות, וטיפול שוטף בתיקי הלקוחות.
    טיפול בדוחות ודיווחים תקופתיים.`,
    company: {
      name: "לאומי",
      logo: "./companies/leumiLogo.png",
      number_of_employees: ["1000", "10000"],
    },
    faculty_relevance: "Economy",
    experience: "Experienced",
    publish_image: "./anonymousImg.png",
  },
  {
    job_id: "2",
    publisher_email: "yafitmi@mta.ac.il",
    published_time: "02-07-2023",
    applies: 2,
    title: "Junior Full-Stack Developer",
    time_required: "FullTime",
    description: ` No software development experience required.
    Objective evidence for outstanding performance and achievements in any field whatsoever (school honors, tennis trophies, etc.)
    Passion for the web, open source, and data.`,
    company: {
      name: "google",
      logo: "./companies/webiksLogo.svg",
      number_of_employees: ["50", "100"],
    },
    faculty_relevance: "ComputerScience",
    experience: "Junior",
    publish_image: "./users/yafitImg.jpg",
  },
  {
    job_id: "3",
    publisher_email: "yafitmi@mta.ac.il",
    published_time: "21-06-2023",
    applies: 100,
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
    publish_image: "./users/yafitImg.jpg",
  },
];

const Jobs = (props) => {
  const [jobs, setJobs] = useState({});
  const [filter, setFilter] = useState(false);
  const [openJobId, setOpenJobId] = useState();
  const toggleFilter = () => {
    setFilter((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    if (filter) {
      filterjobs();
    } else {
      getJobs();
    }
    //TODO update job-open
  }, [filter]);
  const getJobs = async () => {
    setJobs(tempJobs);
    // try {
    //   const config = getConfig(props.user.token);
    //   let jobsRequest = await axios.get("http://localhost:8080/jobs", config);
    //   if (jobsRequest !== undefined && jobsRequest.status === 200) {
    //     console.log("jobs: ", jobsRequest.data);
    //     setJobs(jobsRequest.data);
    //     setOpenJobId(jobsRequest.data[0].id);
    //   }
    // } catch (err) {
    //   alert("משהו השתבש אנא נסה/נסי שנית");
    //   console.log("job request failed");
    // }
    setOpenJobId(tempJobs[0].job_id);
  };

  const filterjobs = async () => {
    let filtered = jobs;
    let user = await getUserProfile(sessionStorage.getItem("token"));
    filtered = filtered.filter((job) => {
      return job.faculty_relevance === user.faculty;
    });

    setJobs(filtered);
    setOpenJobId(filtered[0].job_id);
    console.log("after: ", filtered);

    //TODO update job-open
  };

  return (
    <div className="jobs">
      <Card className="jobs-card">
        <div className="all-jobs">
          <JobsICN className="jobs-icon" />
          <div className="job-open">
            {Object.values(jobs).map((job) => (
              <Job
                isOpen={openJobId === job.job_id}
                user={props.user}
                job_id={job.job_id}
                publisher_email={job.publisher_email}
                published_time={job.published_time}
                publish_image={job.publish_image}
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
          <JobsList
            addJob={getJobs}
            items={jobs}
            user={props.user}
            chosenJobId={openJobId}
            onClick={setOpenJobId}
            toggleFilter={toggleFilter}
          />
        </div>
      </Card>
    </div>
  );
};
export default Jobs;
