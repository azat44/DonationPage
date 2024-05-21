import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DonationForm from './component/DonationForm';
import './DonationPage.css';
import './App.css';

function DonationPage() {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [selectedCause, setSelectedCause] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPaymentStep, setIsPaymentStep] = useState(false);

  const handleSelectAmount = (amount) => {
    setSelectedAmount(amount);  
  };

  const handleSelectCause = (event) => {
    setSelectedCause(event.target.value);
  };

  const handleContinue = () => {
    if (selectedAmount === null || selectedCause === '') {
      setErrorMessage('Veuillez sélectionner un montant de don et une cause.');
    } else {
      console.log(`Continuer avec un don de $${selectedAmount} pour la cause suivante: ${selectedCause}`);
      setErrorMessage('');
      setIsPaymentStep(true);
    }
  };

  const handleSubmit = (formData) => {
    console.log(formData);
    // Vous pouvez effectuer d'autres opérations ici, comme enregistrer les données dans une base de données
    navigate('/payment', { state: { amount: selectedAmount, cause: selectedCause } });
  };

  return (
    <div className="donation-page">
      <h1 className="main-title">Arev Society Donation Page</h1>

      {isPaymentStep ? (
        <DonationForm
          amount={selectedAmount}
          cause={selectedCause}
          onSubmit={handleSubmit}
        />
      ) : (
        <>
          <div className='white-tableau'>
            <h2>Choose Your Gift</h2>
            <div className="select-container">
              <select id="cause" value={selectedCause} onChange={handleSelectCause}>
                <option value="" disabled>Select a cause</option>
                <option value="Artsakh">Artsakh</option>
                <option value="GTech">GTech</option>
                <option value="Educating Programs">Educating Programs</option>
                <option value="Healthcare Programs">Healthcare Programs</option>
                <option value="Where the need is greatest">Where the need is greatest</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="donation-amount">
              {[10, 25, 50, 75, 100].map(value => (
                <button
                  key={value}
                  onClick={() => handleSelectAmount(value)}
                  className={selectedAmount === value ? "selected" : ""}
                >
                  ${value}
                </button>
              ))}
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>
          <button onClick={handleContinue} className="continue-button">
            Continue {selectedAmount !== null ? `$${selectedAmount}` : ''}
          </button>
        </>
      )}
    </div>
  );
}

export default DonationPage;
