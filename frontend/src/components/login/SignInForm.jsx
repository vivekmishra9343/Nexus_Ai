import React from "react";
import InputField from "./InputField";

const SignInForm = () => {
  return (
    <div className='bg-white p-8 rounded-3xl border border-gray-200 shadow-lg w-full max-w-md'>
      <h2 className='text-3xl font-medium text-center mb-8'>Sign in</h2>
      <form>
        <InputField
          label='Email or mobile phone number'
          type='text'
          placeholder=''
        />
        <InputField label='Your password' type='password' placeholder='' />
        <button
          className='w-full bg-gray-300 text-gray-600 py-3 rounded-full mb-4'
          disabled
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
