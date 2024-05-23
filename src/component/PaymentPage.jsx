import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentPage.css';
import paypalImage from '../paypal.svg';

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, cause } = location.state || {};

  const handleBackClick = () => {
    // Naviguer vers la page précédente en gardant les informations actuelles
    navigate(-1, { state: { amount, cause } });
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1>Donate to Charity today!</h1>
        <p>Transforming lives by giving hope, guidance, and empowerment to needy people.</p>
        
        <div className="payment-details">
          <h2>Payment Details</h2>
          <div className="total-gift-container">
            <div className="total-gift">
              <span className="total-gift-label">TOTAL GIFT</span>
              <span className="total-gift-amount">${amount}</span>
            </div>
          </div>
          <button className="paypal-button">
            <img src={paypalImage} alt="PayPal" className="paypal-image" />
          </button>
          <div className="divider">or</div>
          <div className="payment-form">
            <div className="tabs">
              <button className="tab active">Credit Card</button>
            </div>
            <div className="form-group">
              <label>Name on Card</label>
              <input type="text" placeholder="John Doe" />
            </div>
            <div className="form-group">
              <label>Card Number</label>
              <input type="text" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Exp. Date</label>
                <input type="text" placeholder="MM/YY" />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input type="text" placeholder="123" />
              </div>
            </div>
            <div className="form-group">
              <label>Billing Address</label>
              <input type="text" placeholder="123 Main St" />
            </div> 
            <button className="give-button">Give ${amount}</button>
          </div>
        </div>
        <button className="back-button" onClick={handleBackClick}>Back</button>
      </div>
    </div>
  );
}

export default PaymentPage;
