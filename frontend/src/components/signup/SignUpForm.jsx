import React, { useState } from "react";
import InputField from "../login/InputField";
import { apiRequest } from "../../../../api";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    try {
      const data = await apiRequest("/api/auth/signup", "POST", formData);
      setSuccess(data.message);
      // Optionally, clear the form and redirect
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className='bg-white p-8 rounded-3xl border border-gray-200 shadow-lg w-full max-w-md'>
      <h2 className='text-3xl font-medium text-center mb-8'>
        Create an account
      </h2>
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
          label='Email'
          type='email'
          name='email'
          placeholder='Enter your email'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <InputField
          label='Password'
          type='password'
          name='password'
          placeholder='Create a password'
          value={formData.password}
          onChange={handleChange}
          required
        />
        <InputField
          label='Confirm Password'
          type='password'
          name='confirmPassword'
          placeholder='Confirm your password'
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300'
        >
          Sign Up
        </button>
      </form>
      <p className='mt-4 text-center text-sm text-gray-600'>
        Already have an account?{" "}
        <a href='/login' className='text-blue-600 hover:underline'>
          Log in
        </a>
      </p>
    </div>
  );
};

export default SignUpForm;
