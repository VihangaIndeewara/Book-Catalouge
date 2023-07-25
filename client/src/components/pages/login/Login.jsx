import React, { useState } from 'react'
import Header from '../../header/Header'
import './Login.css';
import {useNavigate } from 'react-router-dom';

import axios from 'axios';


export default function Login() {

  const navigate=useNavigate();

  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [page,setPage]=useState("/login");


function handleLogin(){
  axios.post('http://localhost:5000/api/login',{username:username,password:password})
  .then((res)=>(res.data.message)=='true'?navigate("/home"):alert(res.data.message))  
  .catch((err)=>alert(err.data.message));
}



  return (
    
    <div className='loginDiv'>
      <Header/>
      <div >
        <img id='image' src="./assets/images/loginImage.gif" alt="loginImage" />

        <div id='loginbox'>
        <br/>
          <h2 className='titleHeading'>Login</h2>
          <br/>
         
          <div>
            <label className='titles' htmlFor='username'>Username</label>
            <br/>
            <input className='inputLogin' type="text" id='username' 
            onChange={(e)=>{
                setUsername(e.target.value)
            }}/>
          </div>
          <br/>
          <br/>
          
          <div>
            <label  className='titles' htmlFor='password'>Password</label>
            <br/>
            <input className='inputLogin' type="text" id='password'
             onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <br/>
          <br/>
          

       
           <button id='btnLogin' type='button' onClick={handleLogin}>Login</button>
       
  
         
        </div>
      </div>
    </div>
  )
}
