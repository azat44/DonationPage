import React, { useState } from "react";
import "./Donation.css";
import "./DonationDetails.css";
import "./DonationDetailsStep3.css";
import "./DonationDetailsStep4.css";
import "./DonationDetailsStep5.css";

import { GrSecure } from "react-icons/gr";
import { FaArrowLeft } from "react-icons/fa";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import countries from "./countries.json";


import arevLogo from '../Images/Arev_Society_Nonprofit-PNG-Eternity.png';



const Donation = () => {
  const [isMonthly, setIsMonthly] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(""); 
  const [tooltip, setTooltip] = useState(null);
  const [coverFees, setCoverFees] = useState(false);
  const [shakeInput, setShakeInput] = useState(false);
  const [step, setStep] = useState(1);
  const [step2Data, setStep2Data] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [step3Errors, setStep3Errors] = useState({});
  const [step3Data, setStep3Data] = useState({
    streetAddress: "",
    city: "",
    zipCode: "",
    country: "",
  });
  const [step4Data, setStep4Data] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [cardType, setCardType] = useState(null);

  const minimumAmount = 5;
  const donationOptions = [1000, 500, 400, 200, 100, 50];

const handleMonthlyClick = () => {
  setIsMonthly(true); 
  setAnimateLogo(true); 
  setTimeout(() => setAnimateLogo(false), 300); 
};
  const handleCustomAmountChange = (e) => {
    const amount = parseInt(e.target.value.replace(/[^\d]/g, ""), 10) || 0;
    setSelectedAmount(amount);
  };

  const isValidAmount = selectedAmount >= minimumAmount;

  const handleCoverFeesToggle = () => {
    if (selectedAmount >= minimumAmount) {
      setCoverFees(!coverFees);
      const updatedAmount = !coverFees
        ? (selectedAmount * 1.05).toFixed(2)
        : (selectedAmount / 1.05).toFixed(2);
      setSelectedAmount(updatedAmount);
    }
  };

  const handleDonationClick = () => {
    if (!isValidAmount) {
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);
    } else {
      setStep(2);
    }
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!step2Data.firstName) {
      newErrors.firstName = true;
    }
    if (!step2Data.lastName) {
      newErrors.lastName = true;
    }
    if (!step2Data.email) {
      newErrors.email = true;
    } else if (!/\S+@\S+\.\S+/.test(step2Data.email)) {
      newErrors.email = "Invalid email format.";
    }
    return newErrors;
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    const validationErrors = validateStep2();
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      setStep(3);
    } else {
      setErrors(validationErrors);
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);
    }
  };

  const validateStep3 = () => {
    const errors = {};
    if (!step3Data.streetAddress || step3Data.streetAddress.trim() === "") {
      errors.streetAddress = true; 
    }
    const cityRegex = /^[a-zA-Z\u00C0-\u017F\s]+$/; 
    if (!step3Data.city || !cityRegex.test(step3Data.city.trim())) {
      errors.city = true;
    }
    const zipCodeRegex = /^[0-9]{4,10}$/; 
    if (!step3Data.zipCode || !zipCodeRegex.test(step3Data.zipCode.trim())) {
      errors.zipCode = true;
    }
    return errors;
  };

  const handleStep3Submit = (e) => {
    e.preventDefault();
    const errors = validateStep3();

    if (Object.keys(errors).length === 0) {
      setStep3Errors({});
      setStep(4); 
    } else {
      setStep3Errors(errors);
      setShakeInput(true); 
      setTimeout(() => setShakeInput(false), 500); 
    }
  };

  const detectCardType = (number) => {
    const cardTypes = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      discover: /^6/,
    };
    for (const [type, pattern] of Object.entries(cardTypes)) {
      if (pattern.test(number)) {
        return type;
      }
    }
    return null;
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); 
    setCardType(detectCardType(value)); 
    const formattedValue = value.replace(/(.{4})/g, "$1 ").trim(); 
    setStep4Data({ ...step4Data, cardNumber: formattedValue });
  };

  const handleExpirationChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); 
  
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
  
    if (value.length === 5) {
      const [month, year] = value.split("/");
  
      if (parseInt(month) < 1 || parseInt(month) > 12) {
        value = value.slice(0, -1); 
      } else {
       
        const currentYear = new Date().getFullYear().toString().slice(-2); 
        if (parseInt(year) < parseInt(currentYear)) {
          value = value.slice(0, -1); 
        }
      }
    }
  
    setStep4Data({ ...step4Data, expiryDate: value });
  };
  

  const handleCVCChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 3); 
    setStep4Data({ ...step4Data, cvv: value });
  };

  const formatCurrency = () => "$"; 

  const closeTooltip = () => {
    setTooltip(null); 
  };

  const goBack = () => {
    setStep(step - 1); 
  };

  const [animateLogo, setAnimateLogo] = useState(false);

  const handleTooltip = (content, e) => {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();
    setTooltip({
      content,
      x: rect.left + rect.width / 2,
      y: rect.top + window.scrollY - 250,
    });
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
                  selectedAmount === amount ? "selected" : ""
                }`}
                onClick={() => setSelectedAmount(amount)}
              >
                ${amount}
              </button>
            ))}
            <div className="donation-custom-amount-container">
              <span className="currency-symbol">$</span>
              <input
                type="text"
                className={`donation-custom-amount ${
                  !isValidAmount && shakeInput
                    ? "invalid"
                    : isValidAmount
                    ? ""
                    : "invalid-static"
                }`}
                placeholder="Custom Amount"
                value={selectedAmount}
                onChange={(e) => {
                  const amount = parseInt(e.target.value.replace(/[^\d]/g, ""), 10) || "";
                  setSelectedAmount(amount);
                }}
              />
            </div>
          </div>

          <div className="cover-fees">
          <label>
          <input
            type="checkbox"
            checked={coverFees}
            onChange={handleCoverFeesToggle}
            disabled={selectedAmount < minimumAmount}
          />
          I'd like to cover the fees associated with my donation so more of my
          donation goes directly to the <strong><span style={{ color: 'orange' }}>Arev Society</span></strong>.
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
          <img
            src={arevLogo}
            alt="Arev Society Logo"
            className="donation-logo"
          />
          <h2 className="donation-details-title">Enter your details</h2>
          <div className="back-button" onClick={goBack}>
            <FaArrowLeft />
          </div>
          <form onSubmit={handleStep2Submit}>
            <input
              type="text"
              name="firstName"
              className={`donation-input ${errors.firstName ? "error" : ""} ${
                shakeInput ? "shake" : ""
              }`}
              placeholder="First name"
              value={step2Data.firstName}
              onChange={(e) =>
                setStep2Data({ ...step2Data, firstName: e.target.value })
              }
            />
            <input
              type="text"
              name="lastName"
              className={`donation-input ${errors.lastName ? "error" : ""} ${
                shakeInput ? "shake" : ""
              }`}
              placeholder="Last name"
              value={step2Data.lastName}
              onChange={(e) =>
                setStep2Data({ ...step2Data, lastName: e.target.value })
              }
            />
            <input
              type="email"
              name="email"
              className={`donation-input ${errors.email ? "error" : ""} ${
                shakeInput ? "shake" : ""
              }`}
              placeholder="Email address"
              value={step2Data.email}
              onChange={(e) =>
                setStep2Data({ ...step2Data, email: e.target.value })
              }
            />
            {typeof errors.email === "string" && (
              <span className="error-message">{errors.email}</span>
            )}
            <PhoneInput
              country={"fr"}
              value={step2Data.phone}
              onChange={(value) =>
                setStep2Data({ ...step2Data, phone: value })
              }
              containerClass="phone-input-container"
              buttonClass="flag-dropdown"
            />
            <input
              type="tel"
              placeholder="Phone number (optional)"
              className="custom-phone-input"
              value={step2Data.phone}
              maxLength={16}
              onChange={(e) => {
                let value = e.target.value;
                value = value.replace(/[^\d+]/g, "");
                if (value.length > 16) {
                  value = value.slice(0, 16);
                }
                setStep2Data({ ...step2Data, phone: value });
              }}
            />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
            <button type="submit" className="submit-button">
              Continue
            </button>
          </form>
        </div>
      )}





    {step === 3 && (
      <div className="step3-container">
        <img
          src={arevLogo}
          alt="Arev Society Logo"
          className="donation-logo"
        />
        <div className="step3-back-button" onClick={() => setStep(2)}>
          <FaArrowLeft />
        </div>
        <h2 className="step3-title">Enter your address</h2>

        <form onSubmit={handleStep3Submit}>
          <input
            type="text"
            className={`step3-input ${step3Errors.streetAddress ? "error shake" : ""}`}
            placeholder="Street address"
            value={step3Data.streetAddress}
            onChange={(e) =>
              setStep3Data({ ...step3Data, streetAddress: e.target.value })
            }
          />

          <input
            type="text"
            className={`step3-input ${step3Errors.city ? "error shake" : ""}`}
            placeholder="City"
            value={step3Data.city}
            onChange={(e) =>
              setStep3Data({ ...step3Data, city: e.target.value })
            }
          />

          <input
            type="text"
            className={`step3-input ${step3Errors.zipCode ? "error shake" : ""}`}
            placeholder="Zip code"
            value={step3Data.zipCode}
            onChange={(e) =>
              setStep3Data({ ...step3Data, zipCode: e.target.value })
            }
          />

          <select
            id="country-select"
            className="step3-select"
            value={step3Data.country}
            onChange={(e) => setStep3Data({ ...step3Data, country: e.target.value })}
          >
            <option value="">Select your country</option>
            {countries.map((country) => (
              <option key={country["alpha-2"]} value={country["alpha-2"]}>
                {country.name}
              </option>
            ))}
          </select>

          <button type="submit" className="step3-button">
            Continue to Payment
          </button>
        </form>
      </div>
    )}


        {step === 4 && (
          <div className="step4-container">
            <div className="step4-back-button" onClick={() => setStep(3)}>
              <FaArrowLeft />
            </div>
            <h2 className="step4-title">You donate</h2>
            
            <p className="step4-amount">
              {selectedAmount} $/month
            </p> 
            <div className="step4-payment-options">
              <button
                type="button"
                className="payment-button credit-card"
                onClick={() => setStep(5)}
              >
                Credit Card
              </button>
              <button type="button" className="payment-button paypal">
                <img
                  src={require("../Images/paypal.svg").default}
                  alt="PayPal"
                  className="payment-logo"
                />
              </button>
            </div>
          </div>
        )}


          {step === 5 && (
            <div className="step5-container">
              <div className="step5-back-button" onClick={() => setStep(4)}>
                <FaArrowLeft />
              </div>
              <h2 className="step5-title">Credit Card</h2>
              <p className="step5-instruction">
                Please provide your card details to continue with your donation.
              </p>
              <form className="step5-form">
                <div className="card-input-container">
                  <input
                    type="text"
                    placeholder="Card number"
                    className={`step5-input`}
                    maxLength="19"
                    value={step4Data.cardNumber}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, '')
                        .replace(/(.{4})/g, '$1 ')
                        .trim();
                      setStep4Data({ ...step4Data, cardNumber: value });
                      setCardType(detectCardType(value.replace(/\s/g, '').slice(0, 2))); 
                    }}
                  />
                  {cardType && (
                    <img
                      src={
                        cardType === 'visa'
                          ? require('../Images/visa.jpg')
                          : cardType === 'mastercard'
                          ? require('../Images/mastercard.jpg')
                          : cardType === 'amex'
                          ? require('../Images/amex.png')
                          : null
                      }
                      alt="Card Logo"
                      className="card-logo"
                    />
                  )}
                </div>

                <div className="expiry-cvc-container">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="expiry-input"
                    maxLength="5"
                    value={step4Data.expiryDate}
                    onChange={(e) => {
                      let value = e.target.value.replace(/[^0-9]/g, '');
                      if (value.length > 2) {
                        value = `${value.slice(0, 2)}/${value.slice(2, 4)}`; 
                      }
                      setStep4Data({ ...step4Data, expiryDate: value });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="cvc-input"
                    maxLength="3" 
                    value={step4Data.cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 3);
                      setStep4Data({ ...step4Data, cvv: value });
                    }}
                  />
                </div>
                <button type="submit" className="step5-submit-button">
                Donate {selectedAmount} $/month
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
