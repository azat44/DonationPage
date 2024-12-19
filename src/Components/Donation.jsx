import React, { useState, useEffect, useRef  } from "react";
import "./Donation.css";
import "./DonationDetails.css";
import "./DonationDetailsStep3.css";
import "./DonationDetailsStep4.css";
import "./DonationDetailsStep5.css";
import "./Popup.css";
import { GrSecure } from "react-icons/gr";
import { FaArrowLeft } from "react-icons/fa";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import countries from "./countries.json";
import { IoCloseSharp } from "react-icons/io5";
import arevLogo from '../Images/Arev_Society_Nonprofit-PNG-Eternity.png';
import Aos from 'aos';
import 'aos/dist/aos.css';




const Donation = () => {
  const [isMonthly, setIsMonthly] = useState(false);
  const [animationClass, setAnimationClass] = useState("step-enter");
  const [selectedAmount, setSelectedAmount] = useState(""); 
  const [tooltip, setTooltip] = useState(null);
  const [coverFees, setCoverFees] = useState(false);
  const [shakeInput, setShakeInput] = useState(false);
  const [step, setStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(null); 
  const [hasSeenPopup, setHasSeenPopup] = useState(false); 


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
      let month = parseInt(value.slice(0, 2), 10); 
      if (month > 12 || month < 1) {
        month = "12"; 
      }
      value = `${month.toString().padStart(2, "0")}/${value.slice(2, 4)}`;
    }
  
    if (value.length === 5) {
      const [month, year] = value.split("/").map(Number);
      const currentYear = new Date().getFullYear() % 100; 
      const currentMonth = new Date().getMonth() + 1;
  
      if (month < 1 || month > 12 || year < currentYear || (year === currentYear && month < currentMonth)) {
        return; 
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

  const toggleQuestion = (question) => {
    setActiveQuestion((prev) => (prev === question ? null : question));
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".question-wrapper")) {
      setActiveQuestion(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  const handleCloseDonationPage = () => {
    window.location.href = "/"; 

  };


  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState(""); 
  const [isError, setIsError] = useState(false); 

  const validateStep5 = () => { 
    const errors = {};
  
    if (!step4Data.cardNumber || step4Data.cardNumber.length < 19) {
      errors.cardNumber = true;
    }
  
    if (!step4Data.expiryDate || step4Data.expiryDate.length !== 5) {
      errors.expiryDate = true;
    } else {
      const [month, year] = step4Data.expiryDate.split('/').map(Number);
      const currentYear = new Date().getFullYear() % 100; 
      const currentMonth = new Date().getMonth() + 1; 
  
      if (
        month < 1 || month > 12 || 
        year < currentYear || 
        (year === currentYear && month < currentMonth) 
      ) {
        errors.expiryDate = true;
      }
    }
  
    if (!step4Data.cvv || step4Data.cvv.length < 3) {
      errors.cvv = true;
    }
  
    return errors;
  };
  
  const handleStep5Submit = (e) => {
    e.preventDefault();
    const errors = validateStep5();
  
    if (Object.keys(errors).length === 0) {
      console.log("Formulaire Step 5 validé !");
      setIsError({});
    } else {
      setIsError(errors); 
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500); 
    }
  };
  
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  const handleLogoClick = (e) => {
    if (!hasSeenPopup) {
      e.preventDefault(); 
      setShowPopup(true); 
      setHasSeenPopup(true); 
    }
  };

  

  return (
    <div className="donation-page" onClick={closeTooltip} >
      <header className="header">
      <a
        href="https://www.arevsociety.org"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleLogoClick}
      >
        <img
          src={require("../Images/Arev_Society_Logo.webp")}
          alt="Arev Society Logo"
          className="arev-logo"
        />
      </a>

      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-container" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>Maybe next time?</h3>
              <button
                className="popup-close"
                onClick={() => setShowPopup(false)}
              >
                X
              </button>
            </div>
            <p className="popup-text">
              Please leave your email address below, and we'll send you a gentle
              reminder later.
            </p>
            <input
              type="email"
              placeholder="Email address"
              className={`popup-input ${isError ? "error shake" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="popup-buttons">
              <button
                className="popup-btn remind-btn"
                onClick={() => {
                  if (email.includes("@")) {
                    setShowPopup(false);
                  } else {
                    setIsError(true);
                    setTimeout(() => setIsError(false), 500);
                  }
                }}
              >
                Remind me later
              </button>
              <button
                className="popup-btn no-thanks-btn"
                onClick={() => setShowPopup(false)}
              >
                No, thanks
              </button>
            </div>
          </div>
        </div>
      )}
      </header>

      <div className="donation-container">
        <div className="donation-info">
          <img
            src={require("../Images/Arev_Society_Donation_Refugee.webp")}
            alt="Arev Society Donation Refugee"
            className="donation-image"
          />
          <h2 className="donation-info-title" >Make an Impact: Empower Lives</h2>
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

          <div className="donation-form" data-aos="fade-up" data-aos-duration="1000">
            
          {step === 1 && (
          <>
            <div className="secure-title-container" >
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
                    const amount =
                      parseInt(e.target.value.replace(/[^\d]/g, ""), 10) || "";
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
                donation goes directly to the{" "}
                <strong>
                  <span style={{ color: "orange" }}>Arev Society</span>
                </strong>
                .
              </label>
            </div>

            <button className="donate-button" onClick={handleDonationClick}>
              {isMonthly ? "Donate Monthly" : "Donate Once"}
            </button>

            <div className="questions-container">
            <div className="question-wrapper">
            <span
              className="question"
              onClick={() => toggleQuestion("secure")}
            >
              Is my donation secure?
            </span>
            {activeQuestion === "secure" && (
              <div className="tooltip-content">
                <strong>Is my donation secure?</strong>
                <p>
                  Yes, we protect your information using industry-standard TLS/SSL encryption.
                </p>
                <p>
                  We process all payments through Stripe, a leading payment processor trusted by
                  millions of businesses worldwide.
                </p>
                <p>
                  Your sensitive payment information is sent directly to Stripe's PCI-compliant servers
                  using encrypted connections. Our website never stores your credit card details.
                </p>
              </div>
            )}
          </div>


            <div className="question-wrapper">
            <span
              className="question"
              onClick={() => toggleQuestion("taxDeductible")}
            >
              Is this donation tax-deductible?
            </span>
            {activeQuestion === "taxDeductible" && (
              <div className="tooltip-content">
                <strong>Is this donation tax-deductible?</strong>
                <p>
                  <strong>For US donors:</strong> Your contribution is tax-deductible as we are a 
                  registered 501(c)(3) tax-exempt charity. The Arev Society is a 501(c)(3) 
                  not-for-profit organization. Our EIN number is <strong>32-05 12 318</strong>.
                </p>
                <p>
                  We'll email you a donation receipt for your records. Please keep this, as it 
                  is your official record to claim this donation as a tax deduction.
                </p>
                <p>
                  <strong>For international donors:</strong> Tax benefits vary by country. Please check 
                  your local tax regulations or consult with a tax professional regarding deductibility.
                </p>
              </div>
            )}
          </div>


            <div className="question-wrapper">
              <span
                className="question"
                onClick={() => toggleQuestion("cancelRecurring")}
              >
                Can I cancel my recurring donation?
              </span>
              {activeQuestion === "cancelRecurring" && (
                <div className="tooltip-content">
                  <strong>Can I cancel my recurring donation?</strong>
                  <p>
                    Sure, you can cancel or modify your recurring donation at any time.
                  </p>
                  <p>
                    For any requests pertaining to your recurring donations, such as a change 
                    in amount or payment date, updating your payment method, or cancellation, 
                    please contact our donor support team at 
                    <strong>av@arevsociety.org</strong>and we'll assist you right away.
                  </p>
                </div>
              )}
            </div>

            </div>
          </>
        )}


        {step === 2 && (
          <>
        {showPopup && !hasSeenPopup && ( 
          <div className="popup-overlay" onClick={() => setShowPopup(false)}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
              <div className="popup-header">
                <h3>Maybe next time?</h3>
                <button
                  className="popup-close"
                  onClick={() => setShowPopup(false)}
                >
                  X
                </button>
              </div>
              <p className="popup-text">
                Please leave your email address below, and we'll send you a gentle
                reminder later.
              </p>
              <input
                type="email"
                placeholder="Email address"
                className={`popup-input ${isError ? "error shake" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="popup-buttons">
                <button
                  className="popup-btn remind-btn"
                  onClick={() => {
                    if (email.includes("@")) {
                      setShowPopup(false);
                    } else {
                      setIsError(true);
                      setTimeout(() => setIsError(false), 500);
                    }
                  }}
                >
                  Remind me later
                </button>
                <button
                  className="popup-btn no-thanks-btn"
                  onClick={() => setShowPopup(false)}
                >
                  No, thanks
                </button>
              </div>
            </div>
          </div>
        )}

          
          <div className="donation-details-form" data-aos="fade-up" data-aos-duration="1000">
              <img
                src={arevLogo}
                alt="Arev Society Logo"
                className="donation-logo"
              />
            <h2 className="donation-details-title">Enter your details</h2>
            <div className="back-button" onClick={goBack}>
              <FaArrowLeft />
            </div>

            <div className="close-button" onClick={() => setShowPopup(true)}>
              <IoCloseSharp />
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

            <div className="questions-container">
            <div className="question-wrapper">
            <span
              className="question"
              onClick={() => toggleQuestion("secure")}
            >
              Is my donation secure?
            </span>
            {activeQuestion === "secure" && (
              <div className="tooltip-content">
                <strong>Is my donation secure?</strong>
                <p>
                  Yes, we protect your information using industry-standard TLS/SSL encryption.
                </p>
                <p>
                  We process all payments through Stripe, a leading payment processor trusted by
                  millions of businesses worldwide.
                </p>
                <p>
                  Your sensitive payment information is sent directly to Stripe's PCI-compliant servers
                  using encrypted connections. Our website never stores your credit card details.
                </p>
              </div>
            )}
          </div>


            <div className="question-wrapper">
            <span
              className="question"
              onClick={() => toggleQuestion("taxDeductible")}
            >
              Is this donation tax-deductible?
            </span>
            {activeQuestion === "taxDeductible" && (
              <div className="tooltip-content">
                <strong>Is this donation tax-deductible?</strong>
                <p>
                  <strong>For US donors:</strong> Your contribution is tax-deductible as we are a 
                  registered 501(c)(3) tax-exempt charity. The Arev Society is a 501(c)(3) 
                  not-for-profit organization. Our EIN number is <strong>32-05 12 318</strong>.
                </p>
                <p>
                  We'll email you a donation receipt for your records. Please keep this, as it 
                  is your official record to claim this donation as a tax deduction.
                </p>
                <p>
                  <strong>For international donors:</strong> Tax benefits vary by country. Please check 
                  your local tax regulations or consult with a tax professional regarding deductibility.
                </p>
              </div>
            )}
          </div>


            <div className="question-wrapper">
              <span
                className="question"
                onClick={() => toggleQuestion("cancelRecurring")}
              >
                Can I cancel my recurring donation?
              </span>
              {activeQuestion === "cancelRecurring" && (
                <div className="tooltip-content">
                  <strong>Can I cancel my recurring donation?</strong>
                  <p>
                    Sure, you can cancel or modify your recurring donation at any time.
                  </p>
                  <p>
                    For any requests pertaining to your recurring donations, such as a change 
                    in amount or payment date, updating your payment method, or cancellation, 
                    please contact our donor support team at 
                    <strong>av@arevsociety.org</strong>and we'll assist you right away.
                  </p>
                </div>
              )}
            </div>

            </div>
          </div>
        </>
      )}


      {step === 3 && (
        <>
          {showPopup && !hasSeenPopup && ( 
            <div className="popup-overlay" onClick={() => setShowPopup(false)}>
              <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                  <h3>Maybe next time?</h3>
                  <button
                    className="popup-close"
                    onClick={() => setShowPopup(false)}
                  >
                    X
                  </button>
                </div>
                <p className="popup-text">
                  Please leave your email address below, and we'll send you a gentle
                  reminder later.
                </p>
                <input
                  type="email"
                  placeholder="Email address"
                  className={`popup-input ${isError ? "error shake" : ""}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="popup-buttons">
                  <button
                    className="popup-btn remind-btn"
                    onClick={() => {
                      if (email.includes("@")) {
                        setShowPopup(false);
                      } else {
                        setIsError(true);
                        setTimeout(() => setIsError(false), 500);
                      }
                    }}
                  >
                    Remind me later
                  </button>
                  <button
                    className="popup-btn no-thanks-btn"
                    onClick={() => setShowPopup(false)}
                  >
                    No, thanks
                  </button>
                </div>
              </div>
            </div>
          )}


          <div className="step3-container" data-aos="fade-up" data-aos-duration="1000">
            <img
              src={arevLogo}
              alt="Arev Society Logo"
              className="donation-logo"
            />
            <div className="step3-back-button" onClick={() => setStep(2)}>
              <FaArrowLeft />
            </div>

            <h2 className="step3-title">Enter your address</h2>
            <div className="close-button2" onClick={() => setShowPopup(true)}>
              <IoCloseSharp />
            </div>

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
                Continue
              </button>
            </form>

            <div className="questions-container">
            <div className="question-wrapper">
            <span
              className="question"
              onClick={() => toggleQuestion("secure")}
            >
              Is my donation secure?
            </span>
            {activeQuestion === "secure" && (
              <div className="tooltip-content">
                <strong>Is my donation secure?</strong>
                <p>
                  Yes, we protect your information using industry-standard TLS/SSL encryption.
                </p>
                <p>
                  We process all payments through Stripe, a leading payment processor trusted by
                  millions of businesses worldwide.
                </p>
                <p>
                  Your sensitive payment information is sent directly to Stripe's PCI-compliant servers
                  using encrypted connections. Our website never stores your credit card details.
                </p>
              </div>
            )}
          </div>


            <div className="question-wrapper">
            <span
              className="question"
              onClick={() => toggleQuestion("taxDeductible")}
            >
              Is this donation tax-deductible?
            </span>
            {activeQuestion === "taxDeductible" && (
              <div className="tooltip-content">
                <strong>Is this donation tax-deductible?</strong>
                <p>
                  <strong>For US donors:</strong> Your contribution is tax-deductible as we are a 
                  registered 501(c)(3) tax-exempt charity. The Arev Society is a 501(c)(3) 
                  not-for-profit organization. Our EIN number is <strong>32-05 12 318</strong>.
                </p>
                <p>
                  We'll email you a donation receipt for your records. Please keep this, as it 
                  is your official record to claim this donation as a tax deduction.
                </p>
                <p>
                  <strong>For international donors:</strong> Tax benefits vary by country. Please check 
                  your local tax regulations or consult with a tax professional regarding deductibility.
                </p>
              </div>
            )}
          </div>


            <div className="question-wrapper">
              <span
                className="question"
                onClick={() => toggleQuestion("cancelRecurring")}
              >
                Can I cancel my recurring donation?
              </span>
              {activeQuestion === "cancelRecurring" && (
                <div className="tooltip-content">
                  <strong>Can I cancel my recurring donation?</strong>
                  <p>
                    Sure, you can cancel or modify your recurring donation at any time.
                  </p>
                  <p>
                    For any requests pertaining to your recurring donations, such as a change 
                    in amount or payment date, updating your payment method, or cancellation, 
                    please contact our donor support team at 
                    <strong>av@arevsociety.org</strong>and we'll assist you right away.
                  </p>
                </div>
              )}
            </div>

            </div>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          {showPopup && !hasSeenPopup && ( 
          <div className="popup-overlay" onClick={() => setShowPopup(false)}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
              <div className="popup-header">
                <h3>Maybe next time?</h3>
                <button
                  className="popup-close"
                  onClick={() => setShowPopup(false)}
                >
                  X
                </button>
              </div>
              <p className="popup-text">
                Please leave your email address below, and we'll send you a gentle
                reminder later.
              </p>
              <input
                type="email"
                placeholder="Email address"
                className={`popup-input ${isError ? "error shake" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="popup-buttons">
                <button
                  className="popup-btn remind-btn"
                  onClick={() => {
                    if (email.includes("@")) {
                      setShowPopup(false);
                    } else {
                      setIsError(true);
                      setTimeout(() => setIsError(false), 500);
                    }
                  }}
                >
                  Remind me later
                </button>
                <button
                  className="popup-btn no-thanks-btn"
                  onClick={() => setShowPopup(false)}
                >
                  No, thanks
                </button>
              </div>
            </div>
          </div>
        )}


          <div className="step4-container" data-aos="fade-up" data-aos-duration="1000">
            <div className="parent-container">
              <img
                src={arevLogo}
                alt="Arev Society Logo"
                className="donation-logo4"
              />
            </div>

            <div className="step4-back-button" onClick={() => setStep(3)}>
              <FaArrowLeft />
            </div>

            <div className="close-button3" onClick={() => setShowPopup(true)}>
              <IoCloseSharp />
            </div>

            <div className="secure-title-container4">
              <GrSecure className="secure-icon4" />
              <h3 className="secure-title4">Secure donation</h3>
            </div>

            <p className="step4-amount">{selectedAmount} $/month</p>

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

            <div className="questions-container">
            <div className="question-wrapper">
            <span
              className="question"
              onClick={() => toggleQuestion("secure")}
            >
              Is my donation secure?
            </span>
            {activeQuestion === "secure" && (
              <div className="tooltip-content">
                <strong>Is my donation secure?</strong>
                <p>
                  Yes, we protect your information using industry-standard TLS/SSL encryption.
                </p>
                <p>
                  We process all payments through Stripe, a leading payment processor trusted by
                  millions of businesses worldwide.
                </p>
                <p>
                  Your sensitive payment information is sent directly to Stripe's PCI-compliant servers
                  using encrypted connections. Our website never stores your credit card details.
                </p>
              </div>
            )}
          </div>


            <div className="question-wrapper">
            <span
              className="question"
              onClick={() => toggleQuestion("taxDeductible")}
            >
              Is this donation tax-deductible?
            </span>
            {activeQuestion === "taxDeductible" && (
              <div className="tooltip-content">
                <strong>Is this donation tax-deductible?</strong>
                <p>
                  <strong>For US donors:</strong> Your contribution is tax-deductible as we are a 
                  registered 501(c)(3) tax-exempt charity. The Arev Society is a 501(c)(3) 
                  not-for-profit organization. Our EIN number is <strong>32-05 12 318</strong>.
                </p>
                <p>
                  We'll email you a donation receipt for your records. Please keep this, as it 
                  is your official record to claim this donation as a tax deduction.
                </p>
                <p>
                  <strong>For international donors:</strong> Tax benefits vary by country. Please check 
                  your local tax regulations or consult with a tax professional regarding deductibility.
                </p>
              </div>
            )}
          </div>


            <div className="question-wrapper">
              <span
                className="question"
                onClick={() => toggleQuestion("cancelRecurring")}
              >
                Can I cancel my recurring donation?
              </span>
              {activeQuestion === "cancelRecurring" && (
                <div className="tooltip-content">
                  <strong>Can I cancel my recurring donation?</strong>
                  <p>
                    Sure, you can cancel or modify your recurring donation at any time.
                  </p>
                  <p>
                    For any requests pertaining to your recurring donations, such as a change 
                    in amount or payment date, updating your payment method, or cancellation, 
                    please contact our donor support team at 
                    <strong>av@arevsociety.org</strong>and we'll assist you right away.
                  </p>
                </div>
              )}
            </div>

            </div>
          </div>
        </>
      )}

      {step === 5 && (
        <>
          {showPopup && !hasSeenPopup && ( 
          <div className="popup-overlay" onClick={() => setShowPopup(false)}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
              <div className="popup-header">
                <h3>Maybe next time?</h3>
                <button
                  className="popup-close"
                  onClick={() => setShowPopup(false)}
                >
                  X
                </button>
              </div>
              <p className="popup-text">
                Please leave your email address below, and we'll send you a gentle
                reminder later.
              </p>
              <input
                type="email"
                placeholder="Email address"
                className={`popup-input ${isError ? "error shake" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="popup-buttons">
                <button
                  className="popup-btn remind-btn"
                  onClick={() => {
                    if (email.includes("@")) {
                      setShowPopup(false);
                    } else {
                      setIsError(true);
                      setTimeout(() => setIsError(false), 500);
                    }
                  }}
                >
                  Remind me later
                </button>
                <button
                  className="popup-btn no-thanks-btn"
                  onClick={() => setShowPopup(false)}
                >
                  No, thanks
                </button>
              </div>
            </div>
          </div>
        )}


          <div className="step5-container" data-aos="fade-up" data-aos-duration="1000">
            <div className="parent-container">
              <img
                src={arevLogo}
                alt="Arev Society Logo"
                className="donation-logo4"
              />
            </div>

            <div className="step5-back-button" onClick={() => setStep(4)}>
              <FaArrowLeft />
            </div>

            <div className="close-button4" onClick={() => setShowPopup(true)}>
              <IoCloseSharp />
            </div>

            <h2 className="step5-title">Credit Card</h2>
            <p className="step5-instruction">
              Please provide your card details to continue with your donation.
            </p>
            <form className="step5-form" onSubmit={handleStep5Submit}>
            <div className="card-input-container">
              <input
                type="text"
                placeholder="Card number"
                className={`step5-input ${isError.cardNumber && "error"} ${
                  shakeInput && isError.cardNumber ? "shake" : ""
                }`}
                maxLength="19"
                value={step4Data.cardNumber}
                onChange={handleCardNumberChange}
              />
              {cardType && (
                <img
                  src={
                    cardType === "visa"
                      ? require("../Images/visa.jpg")
                      : cardType === "mastercard"
                      ? require("../Images/mastercard.jpg")
                      : cardType === "amex"
                      ? require("../Images/amex.webp")
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
                className={`expiry-input ${isError.expiryDate && "error"} ${
                  shakeInput && isError.expiryDate ? "shake" : ""
                }`}
                maxLength="5"
                value={step4Data.expiryDate}
                onChange={handleExpirationChange}
              />
              <input
                type="text"
                placeholder="CVC"
                className={`cvc-input ${isError.cvv && "error"} ${
                  shakeInput && isError.cvv ? "shake" : ""
                }`}
                maxLength="3"
                value={step4Data.cvv}
                onChange={handleCVCChange}
              />
            </div>

            <button type="submit" className="step5-submit-button">
              Donate {selectedAmount} $/month
            </button>
          </form>

          <div className="questions-container">
            <div className="question-wrapper">
            <span
              className="question"
              onClick={() => toggleQuestion("secure")}
            >
              Is my donation secure?
            </span>
            {activeQuestion === "secure" && (
              <div className="tooltip-content">
                <strong>Is my donation secure?</strong>
                <p>
                  Yes, we protect your information using industry-standard TLS/SSL encryption.
                </p>
                <p>
                  We process all payments through Stripe, a leading payment processor trusted by
                  millions of businesses worldwide.
                </p>
                <p>
                  Your sensitive payment information is sent directly to Stripe's PCI-compliant servers
                  using encrypted connections. Our website never stores your credit card details.
                </p>
              </div>
            )}
          </div>


            <div className="question-wrapper">
            <span
              className="question"
              onClick={() => toggleQuestion("taxDeductible")}
            >
              Is this donation tax-deductible?
            </span>
            {activeQuestion === "taxDeductible" && (
              <div className="tooltip-content">
                <strong>Is this donation tax-deductible?</strong>
                <p>
                  <strong>For US donors:</strong> Your contribution is tax-deductible as we are a 
                  registered 501(c)(3) tax-exempt charity. The Arev Society is a 501(c)(3) 
                  not-for-profit organization. Our EIN number is <strong>32-05 12 318</strong>.
                </p>
                <p>
                  We'll email you a donation receipt for your records. Please keep this, as it 
                  is your official record to claim this donation as a tax deduction.
                </p>
                <p>
                  <strong>For international donors:</strong> Tax benefits vary by country. Please check 
                  your local tax regulations or consult with a tax professional regarding deductibility.
                </p>
              </div>
            )}
          </div>


            <div className="question-wrapper">
              <span
                className="question"
                onClick={() => toggleQuestion("cancelRecurring")}
              >
                Can I cancel my recurring donation?
              </span>
              {activeQuestion === "cancelRecurring" && (
                <div className="tooltip-content">
                  <strong>Can I cancel my recurring donation?</strong>
                  <p>
                    Sure, you can cancel or modify your recurring donation at any time.
                  </p>
                  <p>
                    For any requests pertaining to your recurring donations, such as a change 
                    in amount or payment date, updating your payment method, or cancellation, 
                    please contact our donor support team at 
                    <strong>av@arevsociety.org</strong>and we'll assist you right away.
                  </p>
                </div>
              )}
            </div>

            </div>
          </div>
        </>
      )}

      </div>
   </div>
    </div>
  );
};

export default Donation;
