import { useState } from "react";
import InputField from "../login/InputField";

const SignUpForm = () => {
  // State to hold form input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Basic client-side validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreeToTerms) {
      setError("You must agree to the terms.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/profile/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Signup failed. Please try again.");
      }

      const data = await response.json();
      setSuccess(
        "Signup successful! Please check your email for verification."
      );
      setError(""); // Clear any previous error messages

      // Reset form fields after successful signup
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAgreeToTerms(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='bg-white p-8 rounded-3xl border border-gray-200 shadow-lg w-full max-w-md'>
      <h2 className='text-3xl font-medium text-center mb-8'>
        Create an account
      </h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label='Email'
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label='Password'
          type='password'
          placeholder='Create a password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          label='Confirm Password'
          type='password'
          placeholder='Confirm your password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className='mb-4'>
          <label className='flex items-center'>
            <input
              type='checkbox'
              className='mr-2'
              checked={agreeToTerms}
              onChange={() => setAgreeToTerms(!agreeToTerms)}
            />
            <span className='text-sm text-gray-600'>
              I agree to the Terms of Service and Privacy Policy
            </span>
          </label>
        </div>
        {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
        {success && (
          <p className='text-green-500 text-sm text-center'>{success}</p>
        )}
        <button
          type='submit'
          className='w-full bg-black text-white py-3 rounded-full mb-4'
        >
          Sign Up
        </button>
        <p className='text-sm text-center'>
          By signing up, you agree to our{" "}
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
    </div>
  );
};

export default SignUpForm;
