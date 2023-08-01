import React, { useState } from "react";
import "./JobsList.css";
import Job from "./Job";
import Separator from "../UI/Separator";
import Button from "../UI/Button";
import AddJob from "./AddJob";

const JobsList = (props) => {
  const [addJobOpen, setAddJobOPen] = useState(false);

  const toggleAddJob = () => {
    setAddJobOPen((prev) => {
      return !prev;
    });
  };

  console.log(props.items);
  return (
    <div className="scrolled-job" dir="ltr">
      <div className="open-job" dir="rtl">
        {addJobOpen && (
          <AddJob onCancel={toggleAddJob} onAddJob={props.onSubmit} />
        )}
        <div className="job-filters">
          <Button className="job-filters-btn" onClick={toggleAddJob}>
            פרסום משרה
          </Button>
          <Button className="job-filters-btn" onClick={props.toggleFilter}>
            הצג עבודות שרלוונטיות אליי
          </Button>
        </div>
        {Object.values(props.items).map((job) => (
          <div key={Math.random()}>
            <Job
              isChosen={job.id === props.chosenJobId}
              isList={true}
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
              onClickJob={props.onClick}
              onSubmit={props.onSubmit}
            />
            <Separator />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsList;
