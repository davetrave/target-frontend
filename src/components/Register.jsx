import React, { useState } from "react";
import api from '../services/AuthService';
import { useNavigate } from "react-router-dom";
import { useFlashMessage } from "../context/FlashMessageContext";

const Register = () => {
  const route = "api/user/register/";
  const showMessage = useFlashMessage();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  // Field change handlers reset errors when user is typing
  const handleUsernameOnChange = (e) => {
    setUsername(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, username: '' })); // Reset error
  };

  const handlePasswordOnChange = (e) => {
    setPassword(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, password: '' })); // Reset error
    if (confirmPassword) validateField('confirmPassword', confirmPassword); // Revalidate confirm password
  };

  const handleConfirmPasswordOnChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: '' })); // Reset error
    validateField('confirmPassword', e.target.value); // Revalidate
  };

  const handleEmailOnChange = (e) => {
    setEmail(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, email: '' })); // Reset error
  };

  const handleFirstNameOnChange = (e) => {
    setFirstName(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, firstName: '' })); // Reset error
  };

  const handleLastNameOnChange = (e) => {
    setLastName(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, lastName: '' })); // Reset error
  };

  // Field validation logic
  const validateField = (field, value) => {
    let error = {};
    switch (field) {
      case 'username':
        if (!value) error.username = 'Username is required';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) error.email = 'Email is required';
        else if (!emailRegex.test(value)) error.email = 'Invalid email format';
        break;
      case 'password':
        if (!value) error.password = 'Password is required';
        else if (value.length < 6) error.password = 'Password must be at least 6 characters';
        break;
      case 'confirmPassword':
        if (value !== password) error.confirmPassword = 'Passwords do not match';
        break;
      case 'firstName':
        if (!value) error.firstName = 'First name is required';
        break;
      case 'lastName':
        if (!value) error.lastName = 'Last name is required';
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...error }));
  };

  // Validate all fields on form submission
  const validateForm = () => {
    const fields = { username, password, confirmPassword, email, firstName, lastName };
    let formErrors = {};
    Object.keys(fields).forEach((field) => {
      validateField(field, fields[field]);
      if (!fields[field]) {
        formErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showMessage('Please correct the errors in the form.', 'error');
      return;
    }

    try {
      const response = await api.post(route, {
        username,
        password,
        email,
        firstName,
        lastName
      });

      if (response.status === 200 || response.status === 201) {
        showMessage('Register Successful, Login to continue', 'success');
        navigate("/login");
      } else {
        showMessage('Something went wrong', 'error');
      }
    } catch (error) {
      if (error.response?.data?.detail) showMessage(`Error: ${error.response.data.detail}`, 'error');
      else if (error.response?.data?.username) showMessage(`Error: ${error.response.data.username[0]}`, 'error');
      else showMessage('An error occurred', 'error');
    }
  };

  return (
    <div className="form-container flex justify-center items-center h-screen bg-gray-900">
      <div className="starry-bg"></div>
      <div className="card p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl text-white font-bold mb-6">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username */}
          <div className="input-container">
            {/* <label htmlFor="username" className="neon-label block text-white">Username</label> */}
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameOnChange}
              className={`neon-input block w-full mt-1 p-2 border-2 ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none`}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          {/* Email */}
          <div className="input-container">
            {/* <label htmlFor="email" className="neon-label block text-white">Email</label> */}
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailOnChange}
              className={`neon-input block w-full mt-1 p-2 border-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* First Name */}
          <div className="input-container">
            {/* <label htmlFor="firstName" className="neon-label block text-white">First Name</label> */}
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your First Name"
              value={firstName}
              onChange={handleFirstNameOnChange}
              className={`neon-input block w-full mt-1 p-2 border-2 ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none`}
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div className="input-container">
            {/* <label htmlFor="lastName" className="neon-label block text-white">Last Name</label> */}
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your Last Name"
              value={lastName}
              onChange={handleLastNameOnChange}
              className={`neon-input block w-full mt-1 p-2 border-2 ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none`}
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>

          {/* Password */}
          <div className="input-container">
            {/* <label htmlFor="password" className="neon-label block text-white">Password</label> */}
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordOnChange}
              className={`neon-input block w-full mt-1 p-2 border-2 ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="input-container">
            {/* <label htmlFor="confirmPassword" className="neon-label block text-white">Confirm Password</label> */}
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordOnChange}
              className={`neon-input block w-full mt-1 p-2 border-2 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          {/* Submit */}
          <div className="submit-container">
            <input
              type="submit"
              value="Register"
              className="neon-button w-full py-2 px-4 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
