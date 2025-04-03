import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Authentication() {
  // References for scrolling
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const navigate = useNavigate();
  
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRentNowClick = () => {
    navigate('/login');
  };

  const renderNavbar = () => (
    <nav className="navbar">
      <div className="logo">UniCycle</div>
      <ul className="nav-links">
        <li>Home</li>
        <li onClick={() => scrollToSection(aboutRef)}>About</li>
        <li onClick={() => scrollToSection(contactRef)}>Contact</li>
        <li className="login-btn" onClick={handleRentNowClick}>Login</li>
      </ul>
    </nav>
  );

  const renderHeroSection = () => (
    <section className="hero-section">
      <div className="hero-content">
        <h1>University Cycle Rental</h1>
        <h2>Sustainable Transportation for Campus Life</h2>
        <p>Rent a bicycle and navigate your campus with ease while reducing your carbon footprint.</p>
        <button className="cta-button" onClick={handleRentNowClick}>Rent Now</button>
      </div>
      <div className="hero-image">
        <img src="./university-cycle.png" alt="University students cycling" />
      </div>
    </section>
  );

  const renderAboutSection = () => (
    <section className="about-section" ref={aboutRef}>
      <h2>About UniCycle</h2>
      <div className="about-content">
        <div className="about-image">
          <img src="./rent-station.png" alt="Bicycle station" />
        </div>
        <div className="about-text">
          <p>UniCycle is the university's premier bicycle rental service designed to provide students with an eco-friendly and convenient transportation option around campus.</p>
          <p>Established in 2022, our mission is to reduce carbon emissions on campus while promoting physical activity and making campus navigation easier for all students.</p>
          <h3>How It Works</h3>
          <ol>
            <li>Sign up with your university credentials</li>
            <li>Choose a bicycle from any of our stations</li>
            <li>Scan the QR code to unlock</li>
            <li>Return to any station when done</li>
          </ol>
          
          <h3>Pricing Structure</h3>
          <div className="pricing-table">
            <div className="pricing-header">
              <span>Cycle Type</span>
              <span>First Hour</span>
              <span>Each Additional Hour</span>
              <span>Daily Maximum</span>
            </div>
            <div className="pricing-row">
              <span>Mountain Bike</span>
              <span>Rs 2.00</span>
              <span>Rs 1.50</span>
              <span>Rs 10.00</span>
            </div>
            <div className="pricing-row">
              <span>City Cruiser</span>
              <span>Rs 1.50</span>
              <span>Rs 1.00</span>
              <span>Rs 8.00</span>
            </div>
            <div className="pricing-row">
              <span>Hybrid Bike</span>
              <span>Rs 2.50</span>
              <span>Rs 1.75</span>
              <span>Rs 12.00</span>
            </div>
            <div className="pricing-row">
              <span>Road Bike</span>
              <span>Rs 3.00</span>
              <span>Rs 2.00</span>
              <span>Rs 15.00</span>
            </div>
            <div className="pricing-row">
              <span>Folding Bike</span>
              <span>Rs 2.00</span>
              <span>Rs 1.25</span>
              <span>Rs 9.00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderContactSection = () => {
    const handleContactSubmit = (e) => {
      e.preventDefault();
      alert("Message sent successfully!");
      // Reset form fields
      e.target.reset();
    };
  
    return (
      <section className="contact-section" ref={contactRef}>
        <h2>Contact Us</h2>
        <div className="contact-container">
          <div className="contact-form">
            <form onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label htmlFor="contact-name">Name</label>
                <input type="text" id="contact-name" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email">Email</label>
                <input type="email" id="contact-email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" placeholder="Your Message" rows="5" required></textarea>
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p><strong>Email:</strong> guptarishabh.manish2023@vitstudent.ac.in</p>
            <p><strong>Phone:</strong> (91) 8668232675</p>
            <p><strong>Address:</strong> VIT UNIVERSITY, Vellore</p>
            <p><strong>Hours:</strong> Monday-Friday: 8am-8pm, Weekend: 10am-6pm</p>
          </div>
        </div>
      </section>
    );
  };

  const renderFooter = () => (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">UniCycle</div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</li>
            <li onClick={() => scrollToSection(aboutRef)}>About</li>
            <li onClick={() => scrollToSection(contactRef)}>Contact</li>
            <li onClick={handleRentNowClick}>Login</li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Rishabh Gupta 23BCE0390</p>
          <p>guptarishabh.manish2023@vitstudent.ac.in</p>
          <p>(91) 8668232675</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} UniCycle. All Rights Reserved.</p>
      </div>
    </footer>
  );

  return (
    <div className="authentication-container">
      {renderNavbar()}
      <main className="main-content">
        {renderHeroSection()}
        {renderAboutSection()}
        {renderContactSection()}
      </main>
      {renderFooter()}
    </div>
  );
}

export default Authentication;