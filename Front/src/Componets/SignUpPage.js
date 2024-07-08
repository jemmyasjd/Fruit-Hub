import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
  return (
    <div className="auth-container">
      <SignUp routing="path" path="/sign-up" signInUrl='http://localhost:3000/sign-in' fallbackRedirectUrl={'/home'}/>
    </div>
  );
};

export default SignUpPage;
