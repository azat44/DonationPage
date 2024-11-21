import React, { useState } from "react";
import "./Donation.css";
import { GrSecure } from "react-icons/gr";

const Donation = () => {
  const [isMonthly, setIsMonthly] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(75);
  const [currency, setCurrency] = useState("EUR");
  const [tooltip, setTooltip] = useState(null);

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
    if (currency === "USD") return Math.round(converted / 5) * 5;
    if (currency === "GBP") return Math.round(converted / 5) * 5;
    return Math.round(converted);
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
      y: rect.bottom + window.scrollY + 10, 
    });
  };
  

  const closeTooltip = () => setTooltip(null);

  return (
    <div className="donation-page" onClick={closeTooltip}>
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
            By supporting the Arev Society, you help empower vulnerable
            communities in Armenia, providing vital support to war-affected
            women striving for self-sufficiency and dignity.
          </p>
          <p className="donation-highlight">
            Together, we can drive meaningful change and build brighter futures—
            one life at a time.
          </p>
        </div>
        <div className="donation-form">
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
              onClick={() => setIsMonthly(true)}
            >
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
                onClick={() => setSelectedAmount(getRoundedAmount(amount, currency))}
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
                  !isValidAmount ? "invalid" : ""
                }`}
                placeholder="Other amount"
                value={selectedAmount || ""}
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
            {!isValidAmount && (
              <p className="error-message">
                The minimum donation amount is{" "}
                {currency === "USD"
                  ? `$${minimumAmounts.USD}`
                  : currency === "GBP"
                  ? `£${minimumAmounts.GBP}`
                  : `€${minimumAmounts.EUR}`}
                .
              </p>
            )}
          </div>
          <button className="donate-button" disabled={!isValidAmount}>
            {isMonthly ? "Donate Monthly" : "Donate Once"}
          </button>

          {/* Questions Section */}
          <div className="questions-container">
            <p
              className="question"
              onClick={(e) =>
                handleTooltip(
                  "Yes, we use industry-standard SSL technology to keep your information secure.",
                  e
                )
              }
            >
              Is my donation secure?
            </p>
            <p
              className="question"
              onClick={(e) =>
                handleTooltip(
                  "Your gift is tax-deductible as per your local regulations.",
                  e
                )
              }
            >
              Is this donation tax-deductible?
            </p>
            <p
              className="question"
              onClick={(e) =>
                handleTooltip(
                  "You can cancel your recurring donation anytime through your account settings.",
                  e
                )
              }
            >
              Can I cancel my recurring donation?
            </p>
          </div>
        </div>
        {tooltip && (
          <div
            className="tooltip"
            style={{
              top: tooltip.y,
              left: tooltip.x,
            }}
          >
            {tooltip.content}
          </div>
        )}
      </div>
    </div>
  );
};

export default Donation;
