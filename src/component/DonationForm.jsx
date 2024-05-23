import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DonationForm.css';

function DonationForm({ amount, cause, isMonthly, onSubmit }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.firstName) formErrors.firstName = "First Name is required";
    if (!formData.lastName) formErrors.lastName = "Last Name is required";
    if (!formData.addressLine1) formErrors.addressLine1 = "Address Line 1 is required";
    if (!formData.city) formErrors.city = "City is required";
    if (!formData.state) formErrors.state = "State/Province is required";
    if (!formData.postalCode) formErrors.postalCode = "ZIP/Postal Code is required";
    if (!formData.country) formErrors.country = "Country is required";
    if (!formData.email) formErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = "Email is invalid";
    if (formData.phone && !/^\d+$/.test(formData.phone)) formErrors.phone = "Phone must be numeric";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (typeof onSubmit === 'function') {
        onSubmit({ ...formData, amount, cause, isMonthly });
        navigate("/payment", { state: { ...formData, amount, cause, isMonthly } });
      } else {
        console.error("onSubmit is not a function");
      }
    }
  };

  return (
    <div className="donation-form">
      <h1>Billing Information (test)</h1>
      <p>Don’t enter your real name and card information</p>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            maxLength={25}
          />
          {errors.firstName && <div className="error-message">{errors.firstName}</div>}
        </div>
        <div className="input-group">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            maxLength={25}
          />
          {errors.lastName && <div className="error-message">{errors.lastName}</div>}
        </div>
        <div className="input-group">
          <input
            type="text"
            name="addressLine1"
            placeholder="Address Line 1"
            value={formData.addressLine1}
            onChange={handleChange}
            maxLength={25}
          />
          {errors.addressLine1 && <div className="error-message">{errors.addressLine1}</div>}
        </div>
        <div className="input-group">
          <input
            type="text"
            name="addressLine2"
            placeholder="Address Line 2"
            value={formData.addressLine2}
            onChange={handleChange}
            maxLength={25}
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            maxLength={25}
          />
          {errors.city && <div className="error-message">{errors.city}</div>}
        </div>
        <div className="input-group">
          <input
            type="text"
            name="state"
            placeholder="State/Province"
            value={formData.state}
            onChange={handleChange}
            maxLength={25}
          />
          {errors.state && <div className="error-message">{errors.state}</div>}
        </div>
        <div className="input-group">
          <input
            type="text"
            name="postalCode"
            placeholder="ZIP/Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
            maxLength={25}
          />
          {errors.postalCode && <div className="error-message">{errors.postalCode}</div>}
        </div>
        <div className="input-group">
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            maxLength={25}
          />
          {errors.country && <div className="error-message">{errors.country}</div>}
        </div>
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            maxLength={25}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div className="input-group">
          <input
            type="tel"
            name="phone"
            placeholder="Donor Phone Number (Optional)"
            value={formData.phone}
            onChange={handleChange}
            maxLength={25}
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}

export default DonationForm;
