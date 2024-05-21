import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DonationForm.css';

function DonationForm({ amount, cause, onSubmit }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    gender: '',
    lastName: '',
    firstName: '',
    email: '',
    address: '',
    suite: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.gender) formErrors.gender = "Title is required";
    if (!formData.lastName) formErrors.lastName = "Last Name is required";
    if (!formData.firstName) formErrors.firstName = "First Name is required";
    if (!formData.email) formErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = "Email is invalid";
    if (!formData.address) formErrors.address = "Address is required";
    if (!formData.city) formErrors.city = "City is required";
    if (!formData.postalCode) formErrors.postalCode = "Postal Code is required";
    if (!formData.country) formErrors.country = "Country is required";
    if (!formData.phone) formErrors.phone = "Phone is required";
    else if (!/^\d+$/.test(formData.phone)) formErrors.phone = "Phone must be numeric";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (typeof onSubmit === 'function') {
        onSubmit({ ...formData, amount, cause });
        navigate("/payment", { state: { amount, cause } });
      } else {
        console.error("onSubmit is not a function");
      }
    }
  };

  return (
    <div className="donation-form">
      <h1>Your Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
            <option value="" disabled>Select Title</option>
            <option value="Madame">Madame</option>
            <option value="Monsieur">Monsieur</option>
          </select>
          {errors.gender && <div className="error-message">{errors.gender}</div>}
        </div>
        <div className="input-group">
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
          {errors.lastName && <div className="error-message">{errors.lastName}</div>}
        </div>
        <div className="input-group">
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
          {errors.firstName && <div className="error-message">{errors.firstName}</div>}
        </div>
        <div className="input-group">
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div className="input-group">
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
          {errors.address && <div className="error-message">{errors.address}</div>}
        </div>
        <div className="input-group">
          <input type="text" name="suite" placeholder="Apartment, Suite, etc. (Optional)" value={formData.suite} onChange={handleChange} />
        </div>
        <div className="input-group">
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
          {errors.city && <div className="error-message">{errors.city}</div>}
        </div>
        <div className="input-group">
          <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} />
          {errors.postalCode && <div className="error-message">{errors.postalCode}</div>}
        </div>
        <div className="input-group">
          <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
          {errors.country && <div className="error-message">{errors.country}</div>}
        </div>
        <div className="input-group">
          <input type="tel" name="phone" placeholder="Phone (Optional)" value={formData.phone} onChange={handleChange} />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>
        <div className="input-group">
          <label>
            <input type="checkbox" name="newsletter" />
            I would like to receive news and updates.
          </label>
        </div>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}

export default DonationForm;
