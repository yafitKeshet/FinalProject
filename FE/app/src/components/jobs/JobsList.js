import React from "react";
import "./JobsList.css";
import Job from "./Job";
import Separator from "../UI/Separator";
import Button from "../UI/Button";

const JobsList = (props) => {
  console.log(props.items);
  return (
    <div className="scrolled-job" dir="ltr">
      <div className="open-job" dir="rtl">
        <div className="job-filters">
          <Button className="job-filters-btn" onClick={props.toggleFilter}>
            פרסום משרה
          </Button>
          <Button className="job-filters-btn" onClick={props.toggleFilter}>
            הצג עבודות שרלוונטיות אליי
          </Button>
        </div>
        {Object.values(props.items).map((job) => (
          <div key={Math.random()}>
            <Job
              isChosen={job.job_id === props.chosenJobId}
              isList={true}
              user={props.user}
              job_id={job.job_id}
              publisher_email={job.publisher_email}
              publish_image={job.publish_image}
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
            />
            <Separator />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsList;
