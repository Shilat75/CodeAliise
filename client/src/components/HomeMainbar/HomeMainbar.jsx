import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./HomeMainbar.css";
import QuestionList from "./QuestionList";
import v3 from "./v4.mp4";
import { FaSearch } from "react-icons/fa";

const HomeMainbar = () => {
  const location = useLocation();
  const user = 1;
  const navigate = useNavigate();

  const questionsList = useSelector((state) => state.questionsReducer);

  // state setting for search input
  const [searchTerm, setSearchTerm] = useState("");

  // filter the the response in terms of searchTerms
  const filteredQuestions = questionsList.data?.filter((question) =>
    question.questionTags.some((tag) =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const checkAuth = () => {
    if (user === null) {
      alert("login or signup to ask a question");
      navigate("/Auth");
    } else {
      navigate("/AskQuestion");
    }
  };

  return (
    <div className="main-bar">
      {/* Background video */}
      <video className="background-video" autoPlay loop muted>
        <source src={v3} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Question</h1>
        )}
        <button onClick={checkAuth} className="ask-btn">
          + Ask Question
        </button>
      </div>

      <div className="TotalLengthAndSearchBar">
        {questionsList.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <p>{filteredQuestions?.length || 0} questions</p>
            {/* Search Bar */}
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Question List */}
            <QuestionList questionsList={filteredQuestions || []} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainbar;
