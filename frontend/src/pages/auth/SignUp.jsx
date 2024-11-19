import React from "react";
import Logo from "../../components/signup/Logo";
import Header from "../../components/signup/header";
import SignUpForm from "../../components/signup/SignUpForm";
import Divider from "../../components/signup/Divider";
import SignInButton from "../../components/signup/SignInButton";
import Footer from "../../components/signup/Footer";

const SignUp = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='flex-grow flex flex-col items-center justify-center px-4'>
        <Logo />
        <SignUpForm />
        <Divider text='or' />
        <SignInButton />
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
