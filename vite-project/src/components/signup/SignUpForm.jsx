import InputField from "../login/InputField";
const SignUpForm = () => (
  <div className='bg-white p-8 rounded-3xl border border-gray-200 shadow-lg w-full max-w-md'>
    <h2 className='text-3xl font-medium text-center mb-8'>Create an account</h2>
    <form>
      <InputField label='Email' type='email' placeholder='Enter your email' />
      <InputField
        label='Password'
        type='password'
        placeholder='Create a password'
      />
      <InputField
        label='Confirm Password'
        type='password'
        placeholder='Confirm your password'
      />
      <div className='mb-4'>
        <label className='flex items-center'>
          <input type='checkbox' className='mr-2' />
          <span className='text-sm text-gray-600'>
            I agree to the Terms of Service and Privacy Policy
          </span>
        </label>
      </div>
      <button className='w-full bg-black text-white py-3 rounded-full mb-4'>
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
export default SignUpForm;
