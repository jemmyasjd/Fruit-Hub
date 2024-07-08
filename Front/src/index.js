import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react'


const PUBLISHABLE_KEY = process.env.REACT_APP_PUBLISH_KEY
console.log(PUBLISHABLE_KEY)

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key")
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey='pk_test_d2hvbGUtbW9uc3Rlci04NS5jbGVyay5hY2NvdW50cy5kZXYk'>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);