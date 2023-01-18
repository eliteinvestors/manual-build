import React from 'react'
import PropTypes from 'prop-types'
import {useNavigate} from'react-router-dom';
import {auth} from './Firebase';
import './Navbar.css';



export default function Navbar(props) {
  const navigate = useNavigate();

  return (
    
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mx-auto">

    <div className="container-fluid">
      <a className="navbar-brand" href="/Home">ELITE INVESTORS CLUB</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
        <ul className="navbar-nav">
        <li className="nav-item">
            <a className="nav-link active" href="/About">About</a>
          </li> 
          <li className="nav-item">
            <a className="nav-link active" href="/Home">Current Opportunities</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" href="/Review">Review Responses</a>
          </li>        </ul>

        
          <ul><li className="d-flex nav-item">
            <button className="sign" onClick={()=>{localStorage.removeItem("Auth Token");auth.signOut(); navigate('/');}}>Signout</button>  
          </li></ul>
          
      </div>
    </div>
  </nav>



	

	
	/*<nav className="navbar navbar-expand-md bg-dark navbar-dark">
  <a className="navbar-brand" href="#"><img src="elite investor club image horizontal green.png" alt="" className="logo" /></a>

  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse justify-content-between" id="collapsibleNavbar">
  <ul className="navbar-nav mx-auto">    <li class="container">
    
  </li>
      <li className="nav-item">
        <a className="nav-link" href="#">About</a>
      </li>
      
    </ul>
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" href="#">Current Opportunities</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Review Responses</a>
      </li>
      <li className="d-flex nav-item">
            <button className="sign" onClick={()=>{auth.signOut(); navigate('/')}}>Signout</button>  
          </li>
    </ul>
  
  </div>
</nav>
*/



  )
}

Navbar.propTypes = {
    title: PropTypes.string,
    aboutText: PropTypes.string,
} 