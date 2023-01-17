import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
import "components/InterviewerListItem.scss";
// import PropTypes from 'prop-types';

// {id: number, name: string, avatar: url, selected: boolean}
function InterviewerList(props) {
  const interviewList = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem 
      key={interviewer.id}
      // id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={() => props.onChange(interviewer.id)} />
      )
    })  
    return(
      <section className="interviewers">
  <h4 className="interviewers__header text--light">Interview</h4>
  <ul className="interviewers__list">{interviewList}</ul>
</section>
  )
  
}  
// InterviewerList.propTypes = {
//   interviewers: PropTypes.array.isRequired
// };

export default InterviewerList;