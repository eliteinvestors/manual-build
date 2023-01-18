import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import { Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Review from './components/Review';
import About from './components/About';
import Loginpage from './components/Loginpage';



<HashRouter>
    <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/review" element={<Review/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/" element={<Loginpage/>} />
    </Routes>
</HashRouter>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
