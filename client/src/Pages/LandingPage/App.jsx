import React from 'react';
import { Link } from 'react-router-dom';
import './land.css';
import { Button } from './Button';
import videoSource from './v3.mp4'; // Import the video file
import Footer from './Footer'; // Import the Footer component

function App() {
  return (
    <div className='app-container'>
      <div className='hero-container'>
        <video src={videoSource} autoPlay loop muted />
        <h1>CodeAllies Invites You To Explore</h1>
        <p>What are you waiting for?</p>
        <div className='hero-btns'>
          <Link to="/Questions" className='btn btn--outline btn--large'>
            GET STARTED
          </Link>

          <Link to="/Auth" className='btn btn--primary btn--large'>
            Sign Up <i className='far fa-play-circle' />
          </Link>
        </div>
      </div>
      <Footer /> {/* Add the Footer component */}

    </div>
    
  );
}

export default App;
