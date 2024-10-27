import React, { useState, useEffect } from 'react';
import './About.css';

const AboutUs = () => {
    const missionStatements = [
        "Empowering developers to learn, grow, and innovate.",
        "Revolutionizing knowledge sharing with AI.",
        "Providing accurate, in-depth responses to your most pressing questions.",
        "Building a strong community of developers helping each other."
    ];

    const [currentMission, setCurrentMission] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMission((prevMission) => (prevMission + 1) % missionStatements.length);
        }, 3000); // Change text every 3 seconds

        return () => clearInterval(interval);
    }, [missionStatements.length]);

    return (
        <div className="about-page">
            <section className="intro-section">
                <video className="background-video" autoPlay loop muted>
                    <source src={require('./v3.mp4')} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="overlay">
                    <h1>Get To Know Us</h1>
                    <p>Empowering developers with AI-enhanced knowledge sharing.</p>
                </div>
            </section>

            <section className="content-section">
                <div className="content-wrapper">
                    <div className="mission">
                        <h2>Our Mission</h2>
                        <p className="mission-text">{missionStatements[currentMission]}</p>
                    </div>

                    <div className="values">
                        <h2>Core Values</h2>
                        <div className="value-item">
                            <h3>Innovation</h3>
                            <p>We strive to stay at the forefront of technology, constantly improving our AI algorithms to provide the best possible answers.</p>
                        </div>
                        <div className="value-item">
                            <h3>Community</h3>
                            <p>CodeAllies is built around a strong community of developers who help each other by sharing knowledge and expertise.</p>
                        </div>
                        <div className="value-item">
                            <h3>Accuracy</h3>
                            <p>Our AI models are trained to provide precise and reliable answers, ensuring you get the information you need.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="team-section">
                <h2>Meet Our Team</h2>
                <p>We are a diverse group of tech enthusiasts, AI researchers, and experienced developers dedicated to building the best Q&A platform for the tech community.</p>
            </section>

            <section className="cta-section">
                <h2>Join the Community</h2>
                <p>Ready to take your learning to the next level? Join CodeAllies and become part of a dynamic, AI-powered knowledge-sharing platform.</p>
                <button className="cta-button">Sign Up Now</button>
            </section>
        </div>
    );
};

export default AboutUs;
