import React from "react";
import "./Tags.css";
import { useSelector } from "react-redux";


const TagsList = () => {
  const tags = useSelector((state) => state.tagsReducer);
  return (
    <>
      {
        tags.data?.map((tag,index) => 
        <div className="tag" key={index}>
          <h5>{tag.Name}</h5>
          <p>{tag.Description}</p>
        </div>)
      }

    </>


  );
};

export default TagsList;
