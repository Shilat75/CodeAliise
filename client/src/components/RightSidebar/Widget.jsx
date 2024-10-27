import React, { useState, useEffect } from "react";
import "./RightSidebar.css";
import comment from "../../assets/comment-alt-solid.svg";
import pen from "../../assets/pen-solid.svg";
import blackLogo from "../../assets/blacklogo.svg";

const Widget = () => {
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: "Observability is key to the future of software (and your DevOps career)",
    },
    {
      id: 2,
      title: "Podcast 374: How valuable is your screen name?",
    },
  ]);

  const [featuredMeta, setFeaturedMeta] = useState([
    {
      id: 1,
      icon: comment,
      text: "Review queue workflows - Final release....",
    },
    {
      id: 2,
      icon: comment,
      text: "Please welcome Valued Associates: #958 - V2Blast #959 - SpencerG",
    },
    {
      id: 3,
      icon: blackLogo,
      text: "Outdated Answers: accepted answer is now unpinned on Stack Overflow",
    },
  ]);

  const [hotMetaPosts, setHotMetaPosts] = useState([
    {
      id: 1,
      count: 38,
      text: "Why was this spam flag declined, yet the question marked as spam?",
    },
    {
      id: 2,
      count: 20,
      text: "What is the best course of action when a user has high enough rep to...",
    },
    {
      id: 3,
      count: 14,
      text: "Is a link to the 'How to ask' help page a useful comment?",
    },
  ]);

  // Function to rotate blog posts every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBlogPosts((prevPosts) => {
        const updatedPosts = [...prevPosts];
        const firstPost = updatedPosts.shift();
        updatedPosts.push(firstPost);
        return updatedPosts;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Function to rotate featured meta posts every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedMeta((prevMeta) => {
        const updatedMeta = [...prevMeta];
        const firstMeta = updatedMeta.shift();
        updatedMeta.push(firstMeta);
        return updatedMeta;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Function to rotate hot meta posts every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHotMetaPosts((prevPosts) => {
        const updatedPosts = [...prevPosts];
        const firstPost = updatedPosts.shift();
        updatedPosts.push(firstPost);
        return updatedPosts;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="widget">
      <h4 className="widget-title">The Overflow Blog</h4>
      <div className="right-sidebar-div-1">
        {blogPosts.map((post) => (
          <div key={post.id} className="right-sidebar-div-2">
            <img src={pen} alt="pen" width="18" />
            <p>{post.title}</p>
          </div>
        ))}
      </div>
      <h4 className="widget-title">Featured on Meta</h4>
      <div className="right-sidebar-div-1">
        {featuredMeta.map((meta) => (
          <div key={meta.id} className="right-sidebar-div-2">
            <img src={meta.icon} alt="icon" width="18" />
            <p>{meta.text}</p>
          </div>
        ))}
      </div>
      <h4 className="widget-title">Hot Meta Posts</h4>
      <div className="right-sidebar-div-1">
        {hotMetaPosts.map((post) => (
          <div key={post.id} className="right-sidebar-div-2">
            <p>{post.count}</p>
            <p>{post.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Widget;
