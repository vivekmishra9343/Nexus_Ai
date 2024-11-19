import React from "react";
import Header from "../../components/login/Header";
import Logo from "../../components/login/Logo";
import SignInForm from "../../components/login/SignInForm";
import Divider from "../../components/login/Divider";
import CreateaccountButton from "../../components/login/CreateaccountButton";
import Footer from "../../components/login/Footer";

const Login = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='flex-grow flex flex-col items-center justify-center px-4'>
        <Logo />
        <SignInForm />
        <Divider text='New to our community' />
        <CreateaccountButton />
      </main>
      <Footer />
    </div>
  );
};

export default Login;
