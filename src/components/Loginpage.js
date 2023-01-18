import React, { useEffect, useState } from "react";
import './Login.css';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from './Firebase';
import {useNavigate} from 'react-router-dom';

function Loginpage(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = (e) =>{
        e.preventDefault();
        console.log("refresh prevented");
        signInWithEmailAndPassword(auth, email, password)
        .then(auth=>{
          localStorage.setItem('Auth Token',auth['user']['uid'])
          console.log(auth)
          navigate('/home')
        })
        .catch(error=>console.error(error))
    }

    useEffect(()=>{
      const user_token=localStorage.getItem("Auth Token")
      if(user_token){
        navigate("/home")
      }
    },[])

    // const register = () =>{
    //     createUserWithEmailAndPassword(auth, email, password)
    
    //     .then(auth=>console.log('/home'))
    //     .catch(error=>console.error(error))
    // }
   
    return(
        <>
        
        <img src="elite investor club image horizontal blue.png" alt="" class="img" width="500px" ></img>
        <div className="login-box">
        
        <h2>Welcome</h2>
        <p>Sign in to your account</p>
        <form>
          <div className="user-box">
            <input onChange={(event)=>setEmail(event.target.value)} authComplete="off" type="email" name="email"/>
            <label>Email</label>
          </div>
          <div className="user-box">
            <input onChange={(event)=>setPassword(event.target.value)} authComplete="off" type="password" name="password"/>
            <label>Password</label>
          </div>
          <button onClick={signIn} className="button">Login</button>
           {/* <button onClick={register} className="button">Register</button>  */}

        </form></div>
    
      
  </>
    )      
    
}
export default Loginpage;