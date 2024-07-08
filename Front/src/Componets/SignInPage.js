import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div className="auth-container">
      <SignIn signUpUrl='http://localhost:3000/sign-up'  />
    </div>
  );
};

export default SignInPage;