import React, { useState } from "react";
import Navbar from "./Navbar";
import "./about.css";

export default function AboutPage() {
  return (
    <>
    
    <div class="container">
        <div className="about-img-box">
          <img
            src="minh-pham-OtXADkUh3-I-unsplash.jpg"
            alt=""
            className="about-img"
          ></img>
        </div>
        <div className="about-text">
          <h1>ABOUT US</h1>
          <h2>MEET JERRY SKEFOS</h2>
          <p>
            <i>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco l aboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.</i><br></br><br></br>
            <i>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco l aboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.</i>
          </p>
        </div>
      </div>
    </>
  );
}

