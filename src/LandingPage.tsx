import React from "react";
import "./LandingPage.css";

const LandingPage = () => {
  const handleStartClick = () => {
    // Redirect to the React app or show signup modal
    window.location.href = "/app"; // adjust this if routing with React Router
  };

  return (
    <div className="landing-wrapper">
      <header>
        <nav className="container">
          <a href="#" className="logo">
            <div className="logo-icon">🍽️</div>
            Ounje
          </a>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <button className="cta-button" onClick={handleStartClick}>Get Started</button>
        </nav>
      </header>

      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Smart Food Budget Tracking</h1>
            <p className="hero-subtitle">
              Take control of your food spending with intelligent budgeting,
              seasonal insights, and personalized recommendations.
            </p>
            <div className="hero-buttons">
              <button className="primary-button" onClick={handleStartClick}>Sign Up </button>
              <button className="secondary-button" onClick={() => alert("Demo Coming Soon")}>Watch Demo</button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">PERFECT</div>
                <div className="stat-label">For Budgeting</div>
              </div>
              <div className="stat">
                <div className="stat-number">₦50M+</div>
                <div className="stat-label">Money Saved</div>
              </div>
              <div className="stat">
                <div className="stat-number">4.8⭐</div>
                <div className="stat-label">User Rating</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="phone-mockup">
              <div className="premium-badge">PRO</div>
              <div className="phone-screen">
                <div className="app-ui">
                  <div className="app-header">
                    <div>December Budget</div>
                    <div style={{ fontSize: "12px", opacity: 0.8 }}>₦45,000 / ₦50,000</div>
                  </div>
                  <div className="budget-card">
                    <div style={{ fontSize: "14px", opacity: 0.8 }}>This Month</div>
                    <div style={{ fontSize: "24px", fontWeight: 700 }}>₦45,000</div>
                    <div style={{ fontSize: "12px", color: "#4ade80" }}>↗ 12% under budget</div>
                  </div>
                  <div className="budget-item">
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 600 }}>Rice & Grains</div>
                      <div style={{ fontSize: "12px", opacity: 0.7 }}>₦8,500 / ₦10,000</div>
                    </div>
                    <div style={{ color: "#4ade80" }}>85%</div>
                  </div>
                  <div className="budget-item">
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 600 }}>Vegetables</div>
                      <div style={{ fontSize: "12px", opacity: 0.7 }}>₦6,200 / ₦8,000</div>
                    </div>
                    <div style={{ color: "#feca57" }}>78%</div>
                  </div>
                  <div className="budget-item">
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 600 }}>Proteins</div>
                      <div style={{ fontSize: "12px", opacity: 0.7 }}>₦12,000 / ₦15,000</div>
                    </div>
                    <div style={{ color: "#4ade80" }}>80%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
