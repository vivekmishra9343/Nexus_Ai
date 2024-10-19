import React, { useState } from "react";
import InputField from "./InputField";
import { apiRequest } from "../../../../api"; // Make sure this path is correct

const SignInForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    console.log("Attempting login with:", formData); // Add this log

    try {
      const data = await apiRequest("/api/auth/login", "POST", formData);
      console.log("Login response:", data); // Add this log
      if (data.success) {
        setSuccess(data.message);
        // Here you can handle successful login, e.g., store user data in state or localStorage
        // and redirect to a dashboard page
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className='bg-white p-8 rounded-3xl border border-gray-200 shadow-lg w-full max-w-md'>
      <h2 className='text-3xl font-medium text-center mb-8'>Sign in</h2>
      {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
      {success && <p className='text-green-500 text-sm mb-4'>{success}</p>}
      <form onSubmit={handleSubmit}>
        <InputField
          label='Username'
          type='text'
          name='username'
          placeholder='Enter your username'
          value={formData.username}
          onChange={handleChange}
          required
        />
        <InputField
          label='Password'
          type='password'
          name='password'
          placeholder='Enter your password'
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          className='w-full bg-blue-600 text-white py-3 rounded-full mb-4 hover:bg-blue-700 transition duration-300'
          type='submit'
        >
          Log in
        </button>
        <p className='text-sm text-center'>
          By continuing, you agree to the{" "}
          <a href='#' className='underline'>
            Terms of use
          </a>{" "}
          and{" "}
          <a href='#' className='underline'>
            Privacy Policy
          </a>
          .
        </p>
      </form>
      <div className='flex justify-between mt-6 text-sm'>
        <a href='#' className='text-gray-600 hover:underline'>
          Other issue with sign in
        </a>
        <a href='#' className='text-gray-600 hover:underline'>
          Forget your password
        </a>
      </div>
    </div>
  );
};

export default SignInForm;
