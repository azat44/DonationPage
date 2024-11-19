import React, { useState } from "react";
import "./Donation.css";

const Donation = () => {
  const [isMonthly, setIsMonthly] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("75");
  const [currency, setCurrency] = useState("EUR");

  const handleTabClick = (isMonthlyDonation) => {
    setIsMonthly(isMonthlyDonation);
  };

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setCurrency(newCurrency);
  };

  const handleCustomAmountChange = (e) => {
    const amount = e.target.value.replace(/[^\d]/g, "");
    setSelectedAmount(amount);
  };

  return (
    <div className="donation-page">
      <div className="donation-container">
        <div className="donation-info">
          <img
            src={require("./Arev_Society_Donation_Refugee.webp")}
            alt="Arev Society Donation Refugee"
            className="donation-image"
          />
          <img
            src={require("./Arev_Society_Logo.webp")}
            alt="Logo"
            className="donation-logo"
          />
          <h2 className="donation-info-title">Make an Impact: Empower Lives</h2>
          <p className="donation-subtitle">
            Your donation can create a transformative impact today. <br />
            By supporting the Arev Society, you help empower vulnerable communities
            in Armenia, providing vital support to war-affected women striving for
            self-sufficiency and dignity.
          </p>
          <p className="donation-highlight">
            Together, we can drive meaningful change and build brighter futures—
            one life at a time.
          </p>
        </div>
        <div className="donation-form">
        <h3 className="secure-title">Secure donation</h3>

          <div className="donation-tabs">
            <button
              className={`donation-tab ${!isMonthly ? "active" : ""}`}
              onClick={() => handleTabClick(false)}
            >
              Give once
            </button>
            <button
              className={`donation-tab ${isMonthly ? "active" : ""}`}
              onClick={() => handleTabClick(true)}
            >
              Monthly
            </button>
          </div>

          <div className="donation-options">
            {["400", "200", "120", "75", "55", "35"].map((amount) => (
              <button
                key={amount}
                className={`donation-option ${
                  selectedAmount === amount ? "selected" : ""
                }`}
                onClick={() => setSelectedAmount(amount)}
              >
                €{amount}
              </button>
            ))}
            <div className="donation-custom-amount-container">
              
              <span className="currency-symbol">{currency === "USD" ? "$" : currency === "GBP" ? "£" : "€"}</span>
              
              <input
                type="text"
                className="donation-custom-amount"
                placeholder="Other amount"
                value={selectedAmount}
                onChange={handleCustomAmountChange}
              />
              <select
              className="currency-select"
              value={currency}
              onChange={handleCurrencyChange}
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
            </div>

          </div>
          <button className="donate-button">
            {isMonthly ? "Donate Monthly" : "Donate Once"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Donation;
