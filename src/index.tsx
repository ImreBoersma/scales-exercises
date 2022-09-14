import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDiV2CvZF7LIALRWL-NIlsEMQFP2rbFiUg",
  authDomain: "imre-boersma.firebaseapp.com",
  projectId: "imre-boersma",
  storageBucket: "imre-boersma.appspot.com",
  messagingSenderId: "759710405525",
  appId: "1:759710405525:web:b47df6beeba007d077dc9c"
};

const app = initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
