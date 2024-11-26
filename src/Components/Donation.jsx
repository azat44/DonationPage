import React, { useState } from "react";
import "./Donation.css";
import "./DonationDetails.css";
import { GrSecure } from "react-icons/gr";
import { FaArrowLeft } from "react-icons/fa";

const Donation = () => {
  const [isMonthly, setIsMonthly] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(75);
  const [currency, setCurrency] = useState("EUR");
  const [tooltip, setTooltip] = useState(null);
  const [coverFees, setCoverFees] = useState(false);
  const [animateLogo, setAnimateLogo] = useState(false);
  const [shakeInput, setShakeInput] = useState(false);
  const [step, setStep] = useState(1);

  const conversionRates = {
    USD: 1.1,
    GBP: 0.85,
    EUR: 1,
  };

  const minimumAmounts = {
    USD: 5,
    GBP: 5,
    EUR: 5,
  };

  const donationOptions = [400, 200, 120, 75, 55, 35];

  const getRoundedAmount = (amount, currency) => {
    const converted = amount * conversionRates[currency];
    return Math.round(converted / 5) * 5;
  };

  const handleMonthlyClick = () => {
    setIsMonthly(true);
    setAnimateLogo(true);
    setTimeout(() => setAnimateLogo(false), 300);
  };

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    const convertedAmount = getRoundedAmount(
      selectedAmount / conversionRates[currency],
      newCurrency
    );
    setCurrency(newCurrency);
    setSelectedAmount(convertedAmount);
  };

  const handleCustomAmountChange = (e) => {
    const amount = parseInt(e.target.value.replace(/[^\d]/g, ""), 10) || 0;
    setSelectedAmount(amount);
  };

  const isValidAmount = selectedAmount >= minimumAmounts[currency];

  const handleTooltip = (content, e) => {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();
    setTooltip({
      content,
      x: rect.left + rect.width / 2,
      y: rect.top + window.scrollY - 250,
    });
  };

  const closeTooltip = () => setTooltip(null);

  const handleCoverFeesToggle = () => {
    setCoverFees(!coverFees);
    const updatedAmount = !coverFees
      ? (selectedAmount * 1.05).toFixed(2)
      : (selectedAmount / 1.05).toFixed(2);
    setSelectedAmount(updatedAmount);
  };

  const handleDonationClick = () => {
    if (!isValidAmount) {
      setShakeInput(true);
      setTimeout(() => {
        setShakeInput(false);
      }, 500);
    } else {
      setStep(2);
    }
  };

  const goBack = () => {
    setStep(1); 
  };
  

  return (
    <div className="donation-page" onClick={closeTooltip}>
      <header className="header">
        <a href="https://www.arevsociety.org" target="_blank" rel="noopener noreferrer">
          <img
            src={require("../Images/Arev_Society_Logo.webp")}
            alt="Arev Society Logo"
            className="arev-logo"
          />
        </a>
      </header>

      <div className="donation-container">
        <div className="donation-info">
          <img
            src={require("../Images/Arev_Society_Donation_Refugee.webp")}
            alt="Arev Society Donation Refugee"
            className="donation-image"
          />
          <h2 className="donation-info-title">Make an Impact: Empower Lives</h2>
          <p className="donation-subtitle">
            Your donation can create a transformative impact today. <br />
            By supporting the Arev Society, you help empower vulnerable
            communities in Armenia, providing vital support to war-affected
            women striving for self-sufficiency and dignity.
          </p>
          <p className="donation-highlight">
            Together, we can drive meaningful change and build brighter futures—one life at a time.
          </p>
        </div>

        <div className="donation-form">
          {step === 1 && (
            <>
              <div className="secure-title-container">
                <GrSecure className="secure-icon" />
                <h3 className="secure-title">Secure donation</h3>
              </div>

              <div className="donation-tabs">
                <button
                  className={`donation-tab ${!isMonthly ? "active" : ""}`}
                  onClick={() => setIsMonthly(false)}
                >
                  Give once
                </button>
                <button
                  className={`donation-tab ${isMonthly ? "active" : ""}`}
                  onClick={handleMonthlyClick}
                >
                  <img
                    src={require("../Images/Arev_Society_Nonprofit-PNG-Eternity.png")}
                    alt="Eternity Logo"
                    className={`eternity-logo ${animateLogo ? "animate-logo" : ""}`}
                  />
                  Monthly
                </button>
              </div>

              <div className="donation-options">
                {donationOptions.map((amount) => (
                  <button
                    key={amount}
                    className={`donation-option ${
                      selectedAmount === getRoundedAmount(amount, currency)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedAmount(getRoundedAmount(amount, currency))
                    }
                  >
                    {currency === "USD"
                      ? `$${getRoundedAmount(amount, "USD")}`
                      : currency === "GBP"
                      ? `£${getRoundedAmount(amount, "GBP")}`
                      : `€${getRoundedAmount(amount, "EUR")}`}
                  </button>
                ))}
                <div className="donation-custom-amount-container">
                  <span className="currency-symbol">
                    {currency === "USD" ? "$" : currency === "GBP" ? "£" : "€"}
                  </span>
                  <input
                    type="text"
                    className={`donation-custom-amount ${
                      !isValidAmount && shakeInput
                        ? "invalid"
                        : isValidAmount
                        ? ""
                        : "invalid-static"
                    }`}
                    placeholder="Enter amount"
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
              <div className="cover-fees">
                <label>
                  <input
                    type="checkbox"
                    checked={coverFees}
                    onChange={handleCoverFeesToggle}
                  />
                  I'd like to cover the fees associated with my donation so more
                  of my donation goes directly to the{" "}
                  <strong>Arev Society</strong>.
                </label>
              </div>

              <button className="donate-button" onClick={handleDonationClick}>
                {isMonthly ? "Donate Monthly" : "Donate Once"}
              </button>

              <div className="questions-container">
                <span
                  className="question"
                  onClick={(e) => handleTooltip("Learn how your donations are secured.", e)}
                >
                  Is my donation secure?
                </span>
                <span
                  className="question"
                  onClick={(e) => handleTooltip("Find out about tax-deductible benefits.", e)}
                >
                  Is this donation tax-deductible?
                </span>
                <span
                  className="question"
                  onClick={(e) => handleTooltip("Learn about canceling recurring donations.", e)}
                >
                  Can I cancel my recurring donation?
                </span>
              </div>
            </>
          )}

          {step === 2 && (
            <div className="donation-details-form">
            <div className="back-button" onClick={goBack}>
              <FaArrowLeft />
            </div>
            <h2 className="donation-details-title">Enter your details</h2>
            <form>  
              <input type="text" placeholder="First name" required />
              <input type="text" placeholder="Last name" required />
              <input type="email" placeholder="Email address" required />
              <input type="tel" placeholder="Phone number (optional)" />
              <button type="submit" className="submit-button">
                Submit Donation
              </button>
            </form>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Donation;
