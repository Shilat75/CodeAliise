import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import v3 from "./v4.mp4"; 

const Questions = ({ question }) => {
  return (
    <div className="display-question-container">
      <video className="background-video" autoPlay loop muted>
        <source src={v3} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="display-votes-ans">
        <p>{question.upVote.length - question.downVote.length}</p>
        <p>votes</p>
      </div>
      <div className="display-votes-ans">
        <p>{question.noOfAnswers}</p>
        <p>answers</p>
      </div>
      <div className="display-question-details">
        
        <Link to={`/Questions/${question._id}`} className="question-title-link">
          {question.questionTitle.length > (window.innerWidth <= 400 ? 70 : 90)
            ? question.questionTitle.substring(
                0,
                window.innerWidth <= 400 ? 70 : 90
              ) + "..."
            : question.questionTitle}
        </Link>
        <div className="display-tags-time">
          <div className="display-tags">
            {question.questionTags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
          <p className="display-time">
            asked {moment(question.askedOn).fromNow()} {question.userPosted}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Questions;
