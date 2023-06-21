import React from "react";
import "./JobsList.css";
import Job from "./Job";
import Separator from "../UI/Separator";

const JobsList = (props) => {
  console.log(props.items);
  return (
    <div className="scrolled-job" dir="ltr">
      <div className="open-job" dir="rtl">
        <div className="job-filters">יהיו פה פילטרים</div>
        {props.items.map((job) => (
          <div key={Math.random()}>
            <Job
              isChosen={job.job_id === props.chosenJobId}
              isList={true}
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
