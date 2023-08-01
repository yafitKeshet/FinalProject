import React, { useState, useEffect } from "react";
import "./Jobs.css";
import Job from "./Job";
import Card from "../UI/Card";
import JobsList from "./JobsList";
import JobsICN from "../UI/SVG/JobsICN";
import { getConfig, getUserProfile } from "../user/user.ts";
import axios from "axios";

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
      filterJobs();
    } else {
      getJobs();
    }
  }, [filter]);

  const getJobs = async () => {
    try {
      const config = getConfig(props.user.token);
      let jobsRequest = await axios.get("http://localhost:8080/jobs", config);
      if (jobsRequest !== undefined && jobsRequest.status === 200) {
        console.log("jobs: ", jobsRequest.data);
        setJobs(jobsRequest.data);
        if (jobsRequest.data.length) setOpenJobId(jobsRequest.data[0].id);
      }
    } catch (err) {
      console.log(err);
      console.log("job request failed");
    }
  };

  const filterJobs = async () => {
    let filtered = jobs;
    let user = await getUserProfile(sessionStorage.getItem("token"));
    filtered = filtered.filter((job) => {
      return job.faculty_relevance === user.faculty;
    });

    setJobs(filtered);
    if (filtered.length) setOpenJobId(filtered[0].id);
    console.log("after: ", filtered);
  };

  return (
    <div className="jobs">
      <Card className="jobs-card">
        <div className="all-jobs">
          <JobsICN className="jobs-icon" />
          <div className="job-open">
            {Object.values(jobs).map((job) => (
              <Job
                isOpen={openJobId === job.id}
                user={props.user}
                job_id={job.id}
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
                onSubmit={getJobs}
              />
            ))}
          </div>
          <JobsList
            onSubmit={getJobs}
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
