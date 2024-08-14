import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
import { AuthProvider } from './components/Auth'; // Ensure you have this hook implemented correctly
=======
>>>>>>> master

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <AuthProvider>
      <App />
    </AuthProvider>
=======
    <App />
>>>>>>> master
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
<<<<<<< HEAD
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-v
=======
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
>>>>>>> master
