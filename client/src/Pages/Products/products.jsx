import React, { useState, useEffect } from 'react';
import './products.css';

const Products = () => {
    const productFeatures = [
        "Feature-rich solutions for your needs.",
        "Innovative design and seamless integration.",
        "Boost productivity with our cutting-edge technology.",
        "Reliable and scalable products for every use case."
    ];

    const [currentFeature, setCurrentFeature] = useState(0);

    useEffect(() => {
        const featureInterval = setInterval(() => {
            setCurrentFeature((prevFeature) => (prevFeature + 1) % productFeatures.length);
        }, 3000); // Change feature every 3 seconds

        return () => clearInterval(featureInterval);
    }, [productFeatures.length]);

    return (
        <div className="products-page">
            <section className="hero-section">
                <video className="background-video" autoPlay loop muted>
                    <source src={require('../About/v3.mp4')} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="overlay">
                    <h1>Our Products</h1>
                    <p>Explore our range of innovative products designed to enhance your workflow.</p>
                </div>
            </section>

            <section className="features-section">
                <div className="features-wrapper">
                    <h2>Product Features</h2>
                    <p className="feature-text">{productFeatures[currentFeature]}</p>
                </div>
            </section>

            <section className="product-list">
                <div className="product-item">
                    <h3>AI-Powered Code Assistant</h3>
                    <p> An advanced tool that uses AI to assist developers in writing and debugging code. It offers real-time suggestions, error detection, and code optimization tips to enhance productivity and code quality.</p>
                </div>
                <div className="product-item">
                    <h3>Intelligent Knowledge Base</h3>
                    <p> A comprehensive knowledge base that leverages AI to provide detailed, context-aware answers to common technical questions. It integrates with your platform to deliver relevant information based on user queries.</p>
                </div>
                <div className="product-item">
                    <h3>AI-Powered Chatbot Integration</h3>
                    <p> A chatbot solution that integrates with your platform to provide instant, AI-driven responses to user queries. It can handle a wide range of questions and escalate complex issues to human experts if needed.</p>
                </div>
            </section>

            <section className="testimonials-section">
                <h2>Customer Testimonials</h2>
                <div className="testimonial">
                    <p>"This product changed the way I work! Highly recommended."</p>
                    <cite>- -James Bardon-</cite>
                </div>
                <div className="testimonial">
                    <p>"Amazing quality and excellent support. Worth every penny."</p>
                    <cite>- -Nelly Armstrong-</cite>
                </div>
            </section>

            <section className="cta-section">
                <h2>Ready to Get Started?</h2>
                <p>Discover how our products can transform your workflow. Get in touch with us today!</p>
                <button className="cta-button">Contact Us</button>
            </section>
        </div>
    );
};

export default Products;
