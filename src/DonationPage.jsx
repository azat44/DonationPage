import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DonationForm from './component/DonationForm';
import './DonationPage.css';
import './App.css';

function DonationPage() {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedCause, setSelectedCause] = useState('');
  const [isMonthly, setIsMonthly] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPaymentStep, setIsPaymentStep] = useState(false);

  const handleSelectAmount = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value) && value.length <= 25) { // Added character limit
      setCustomAmount(value);
      setSelectedAmount('General Support');
    }
  };

  const handleSelectCause = (event) => {
    setSelectedCause(event.target.value);
  };

  const handleToggleDonationType = (type) => {
    setIsMonthly(type === 'monthly');
  };

  const handleContinue = () => {
    if ((selectedAmount === null || selectedCause === '') ||
        (selectedAmount === 'General Support' && customAmount === '')) {
      setErrorMessage('Please select a cause and a donation amount.');
    } else {
      console.log(`Continue with a donation of $${selectedAmount === 'General Support' ? customAmount : selectedAmount} for the cause: ${selectedCause}`);
      setErrorMessage('');
      setIsPaymentStep(true);
    }
  };

  const handleSubmit = (formData) => {
    console.log(formData);
    navigate('/payment', { state: { amount: selectedAmount === 'General Support' ? customAmount : selectedAmount, cause: selectedCause, isMonthly } });
  };

  return (
    <div className="donation-page">
      <h1 className="main-title">Charity Donation Template Page</h1>
      <p className="intro-text">(This donation page is for testing: we don’t collect or store any personal or payment card information)</p>

      {isPaymentStep ? (
        <DonationForm
          amount={selectedAmount === 'General Support' ? customAmount : selectedAmount}
          cause={selectedCause}
          isMonthly={isMonthly}
          onSubmit={handleSubmit}
        />
      ) : (
        <>
          <div className='white-tableau'>
            <h2>Select your donation</h2>
            <div className="donation-type">
              <button 
                className={!isMonthly ? "selected" : ""} 
                onClick={() => handleToggleDonationType('once')}
              >
                Give Once
              </button>
              <button 
                className={isMonthly ? "selected" : ""} 
                onClick={() => handleToggleDonationType('monthly')}
              >
                Give Monthly
              </button>
            </div>
            <div className="select-container">
              <select id="cause" value={selectedCause} onChange={handleSelectCause}>
                <option value="" disabled>Select a cause</option>
                <option value="Women Economic Empowerment">Women Economic Empowerment</option>
                <option value="Refugee Women Empowerment">Refugee Women Empowerment</option>
                <option value="Digital Literacy">Digital Literacy</option>
                <option value="General Support">General Support</option>
              </select>
            </div>
            <div className="donation-amount">
              {[25, 50, 75, 100, 200].map(value => (
                <button
                  key={value}
                  onClick={() => handleSelectAmount(value)}
                  className={selectedAmount === value ? "selected" : ""}
                >
                  ${value}
                </button>
              ))}
              <button
                key="general support"
                onClick={() => handleSelectAmount('General Support')}
                className={selectedAmount === 'General Support' ? "selected" : ""}
              >
                General Support
                {selectedAmount === 'General Support' && (
                  <input
                    type="text"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="custom-amount-input"
                    placeholder="Enter amount"
                  />
                )}
              </button>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>
          <button onClick={handleContinue} className="continue-button">
            Continue {selectedAmount !== null ? `$${selectedAmount === 'General Support' ? customAmount : selectedAmount}` : ''}
          </button>
        </>
      )}
    </div>
  );
}

export default DonationPage;
