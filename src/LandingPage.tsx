import React, { useState } from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { supabase } from "./supabaseClient";
import "./LandingPage.css";

const LandingPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleStartClick = () => setShowAuthModal(true);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    else window.location.href = "/app";
  };

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else window.location.href = "/app";
  };

  const paymentConfig = (amount: number) => ({
    public_key: "FLWPUBK_TEST-xxxxxx", // Replace with your real key
    tx_ref: Date.now().toString(),
    amount,
    currency: "NGN",
    payment_options: "card,ussd,banktransfer",
    customer: {
      email: email || "test@ounje.app",
      name: email.split("@")[0] || "User",
      phone_number: "08000000000", // Required by Flutterwave now
    },

    customizations: {
      title: "Ounje Subscription",
      description: `Access full features for ₦${amount}`,
      logo: "https://your-logo-url.com/logo.png",
    },
    callback: async (response: any) => {
      console.log("Payment successful:", response);
      closePaymentModal();

      if (!email) {
        alert("Email not found. Please log in or sign up first.");
        return;
      }

      try {
        const { error } = await supabase
          .from("profiles")
          .update({ is_premium: true })
          .eq("email", email);

        if (error) {
          console.error(
            "Supabase update error:",
            error.message || JSON.stringify(error)
          );
          alert("Upgrade failed: " + (error.message || JSON.stringify(error)));
        } else {
          alert("You're now a premium user! 🎉");
        }
      } catch (err: any) {
        console.error("Unexpected error:", err);
        alert("Unexpected error: " + (err.message || JSON.stringify(err)));
      }
    },

    onClose: () => {
      console.log("Payment modal closed");
    },
  });

  return (
    <div className="landing-wrapper">
      <header>
        <nav className="container">
          <a href="#" className="logo">
            <div className="logo-icon">🍽️</div>
            Ounje
          </a>
          <ul className="nav-links">
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <button className="cta-button" onClick={handleStartClick}>
            Get Started
          </button>
        </nav>
      </header>

      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Smart Food Budget Tracking</h1>
            <p className="hero-subtitle">
              Take control of your food spending with intelligent budgeting and
              seasonal insights.
            </p>
            <div className="hero-buttons">
              <button className="primary-button" onClick={handleStartClick}>
                Start Free Trial
              </button>
              <button
                className="secondary-button"
                onClick={() => alert("Demo Coming Soon")}
              >
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="section">
        <h2>Features</h2>
        <ul>
          <li>Track spending by food category</li>
          <li>Get alerts for in-season foods</li>
          <li>Compare your planned vs actual budget</li>
          <li>Smart food budgeting tips and insights</li>
        </ul>
      </section>

      <section id="pricing" className="section">
        <h2>Pricing</h2>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Monthly</h3>
            <p>₦3,000</p>
            <FlutterWaveButton {...paymentConfig(3000)} text="Subscribe" />
          </div>
          <div className="pricing-card">
            <h3>Yearly</h3>
            <p>₦30,000</p>
            <FlutterWaveButton {...paymentConfig(30000)} text="Subscribe" />
          </div>
          <div className="pricing-card">
            <h3>Lifetime</h3>
            <p>₦150,000</p>
            <div className="note">Valid for 2 weeks after launch</div>
            <FlutterWaveButton {...paymentConfig(150000)} text="Subscribe" />
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <h2>About</h2>
        <p>
          Ounje is built to help Nigerian households plan and track food
           spending with seasonal awareness, category-based budgeting, and
          insightful reminders.
        </p>
      </section>

      <section id="contact" className="section">
        <h2>Contact</h2>
        <p>
          Email: <a href="mailto:support@ounje.app">support@ounje.app</a>
        </p>
      </section>

      {showAuthModal && (
        <div className="auth-modal">
          <div className="auth-content">
            <h3>Login or Sign Up</h3>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignup}>Sign Up</button>
            <button onClick={() => setShowAuthModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
