import React from 'react';
import {HashRouter, Routes, Route } from 'react-router-dom';
import Loginpage from './components/Loginpage';
import Home from './components/Home';
import { useEffect } from 'react';
import {auth} from './components/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Review from './components/Review';
import AboutPage from './components/AboutPage';
import About from './components/About';

function App() {
      

return(

  <HashRouter basename={process.env.PUBLIC_URL}>
      <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/review" element={<Review/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/" element={<Loginpage/>} />
      </Routes>
   </HashRouter>   

);

}

export default App;
