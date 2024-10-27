import React from 'react';
import './Teams.css';

const ForTeams = () => {
    return (
        <div className="for-teams-page">
            <section className="hero-section">
                <video className="background-video" autoPlay loop muted>
                    <source src={require('../About/v3.mp4')} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>Empower Your Team with CodeAllies</h1>
                        <p>Unlock the full potential of your team with our AI-driven platform designed to enhance collaboration and knowledge sharing.</p>
                        <button className="cta-button">Get Started</button>
                    </div>
                </div>
            </section>

            <section className="benefits-section">
                <div className="container">
                    <div className="benefit-item">
                        <h3>Enhanced Collaboration</h3>
                        <p>Facilitate seamless communication and knowledge sharing within your team with our interactive Q&A features.</p>
                    </div>
                    <div className="benefit-item">
                        <h3>AI-Powered Insights</h3>
                        <p>Leverage advanced AI to get insightful answers and suggestions, helping your team stay ahead in the tech industry.</p>
                    </div>
                    <div className="benefit-item">
                        <h3>Customizable Workflows</h3>
                        <p>Tailor the platform to fit your team's specific needs and workflows, ensuring an optimized experience.</p>
                    </div>
                </div>
            </section>

            <section className="features-section">
                <div className="container">
                    <h2>Features for Teams</h2>
                    <div className="feature-item">
                        <h3>Team Dashboards</h3>
                        <p>Monitor team activity, track progress, and manage tasks with our comprehensive dashboards.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Knowledge Base</h3>
                        <p>Create and maintain a centralized knowledge base for your team to access important information and resources.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Advanced Analytics</h3>
                        <p>Utilize powerful analytics tools to measure team performance and identify areas for improvement.</p>
                    </div>
                </div>
            </section>

            

            <section className="cta-section">
                <h2>Ready to Transform Your Team?</h2>
                <p>Contact us to learn more about how CodeAllies can benefit your team or schedule a demo today.</p>
                <button className="cta-button">Contact Us</button>
            </section>
        </div>
    );
};

export default ForTeams;
