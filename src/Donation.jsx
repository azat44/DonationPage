import React, { useState } from "react";
import "./Donation.css";
import { GrSecure } from "react-icons/gr";

const Donation = () => {
  const [isMonthly, setIsMonthly] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(75);
  const [currency, setCurrency] = useState("EUR");
  const [tooltip, setTooltip] = useState(null);
  const [coverFees, setCoverFees] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [animateLogo, setAnimateLogo] = useState(false);
  const [shakeInput, setShakeInput] = useState(false);

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

  const handleCoverFeesToggle = (e) => {
    const cursorPosition = document.querySelector(".donation-custom-amount")
      ?.selectionStart; // Capturez la position du curseur
    setCoverFees(!coverFees);

    // Calculez le montant total avec ou sans frais
    const updatedAmount = !coverFees
      ? (selectedAmount * 1.05).toFixed(2)
      : (selectedAmount / 1.05).toFixed(2);
    setSelectedAmount(updatedAmount);

    // Rétablissez la position du curseur
    setTimeout(() => {
      const inputField = document.querySelector(".donation-custom-amount");
      if (inputField && cursorPosition) {
        inputField.setSelectionRange(cursorPosition, cursorPosition);
      }
    }, 0);
  };

  const handleDonationClick = () => {
    if (!isValidAmount) {
      setShakeInput(true);
  
      setTimeout(() => {
        setShakeInput(false); 
      }, 500);
    } else {
      console.log("Donation submitted:", selectedAmount, currency);
    }
  };
  

  const totalAmount = coverFees ? selectedAmount * 1.05 : selectedAmount;


  return (
    <div className="donation-page" onClick={closeTooltip}>
    <header className="header">
        <a href="https://www.arevsociety.org" target="_blank" rel="noopener noreferrer">
          <img
            src={require("./Images/Arev_Society_Logo.webp")}
            alt="Arev Society Logo"
            className="arev-logo"
          />
        </a>
      </header>
      <div className="donation-container">
        <div className="donation-info">
          <img
            src={require("./Images/Arev_Society_Donation_Refugee.webp")}
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
            Together, we can drive meaningful change and build brighter futures— one life at a time.
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
              onClick={handleMonthlyClick}
            >
              <img
                src={require(".//Images/Arev Society_Nonprofit-PNG-Eternity.png")}
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
              !isValidAmount && shakeInput ? "invalid" : isValidAmount ? "" : "invalid-static"
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
            I'd like to cover the fees associated with my donation so more of my donation goes directly to the <strong>
            <a href="https://www.arevsociety.org" className="arev-link">
                 Arev Society
              </a>
            </strong>.
          </label>
        </div>


        <button
          className="donate-button"
          onClick={handleDonationClick}
        >
          {isMonthly ? "Donate Monthly" : "Donate Once"}
        </button>


          <div className="questions-container">
          <p
            className="question"
            onClick={(e) =>
              handleTooltip(
                "Yes, we protect your information using industry-standard TLS/SSL encryption.\n\nWe process all payments through Stripe, a leading payment processor trusted by millions of businesses worldwide.\n\nYour sensitive payment information is sent directly to Stripe's PCI-compliant servers using encrypted connections. Our website never stores your credit card details.",
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
                  "For US donors: Your contribution is tax-deductible as we are a registered 501(c)(3) tax exempt charity. The Arev Society is a 501(c)(3) not-for-profit organization. Our EIN number is 32-05 12 318.\n\nWe'll email you a donation receipt for your records. Please keep this, as it is your official record to claim this donation as a tax deduction.\n\nFor international donors: Tax benefits vary by country. Please check your local tax regulations or consult with a tax professional regarding deductibility.",
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
                  "Sure, you can cancel or modify your recurring donation at any time.\n\nFor any requests pertaining to your recurring donations, such as a change in amount or payment date, updating your payment method, or cancellation, please contact our donor support team at av@arevsociety.org and we'll assist you right away.",
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

      {showPopup && (
        <div className="modal">
          <div className="modal-content">
            <p>We’d love to hear from you! Please leave us a message before continuing.</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donation;
