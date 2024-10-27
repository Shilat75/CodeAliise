import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic (e.g., send data to the server or show a confirmation message)
        console.log(formData);
    };

    return (
        <div className="contact-page">
            <section className="intro-section">
                {/* <video className="background-video" autoPlay loop muted>
                    <source src={require('./v3.mp4')} type="video/mp4" />
                    Your browser does not support the video tag.
                </video> */}
                <div className="overlay">
                    <h1>Contact Us</h1>
                    <p>We'd love to hear from you. Feel free to reach out for any inquiries.</p>
                </div>
            </section>

            <section className="contact-form-section">
                <div className="form-wrapper">
                    <h2>Get In Touch</h2>
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="cta-button">Send Message</button>
                    </form>
                </div>
            </section>

            <section className="cta-section">
                <h2>Join the Community</h2>
                <p>Want to collaborate or learn more about CodeAliise? Get in touch with us!</p>
            </section>
        </div>
    );
};

export default Contact;
