import React from "react";
import styles from "./Signin.module.css";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Signin() {
  const [credentials,setCredentials] = useState({email:"",password:""});
  const [isLoggedin,setIsLoggedIn] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e)=>{
    const {name,value} = e.target;

    setCredentials((prevData)=>({
      ...prevData,
      [name]:value
    }))
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();


   try{
     const data = await axios.post("http://localhost:3000/api/admin/get-admin",credentials,{
      withCredentials:true,
      headers:{
        "Content-Type":"application/json"
      }
    })

   if(data)
   {
    
    setIsLoggedIn(true)
   
  }
  else{
     setIsLoggedIn(false)

   }
    
   }catch(err)
   {
     setIsLoggedIn(false)
    console.log("frontend Error",err)
   }

  }
  return (

<form  className={styles.form}>
    <h2 style={{textAlign:"center"}}>ADMIN</h2>
    <div className={styles["flex-column"]}>
      <label>Email </label></div>
      <div className={styles.inputForm}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 32 32" height="20"><g data-name="Layer 3" id="Layer_3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
        <input placeholder="Enter your Email" className={styles.input} type="text" name="email" onChange={handleChange}  value={credentials.email}  style={{ backgroundColor: 'transparent' }}/>
      </div>

    <div className={styles["flex-column"]}>
      <label>Password </label></div>
      <div className={styles.inputForm}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>
        <input placeholder="Enter your Password" className={styles.input} name="password" type="password" onChange={handleChange} value={credentials.password}/>
      </div>

    <div className={styles["flex-row"]}>
      <span className={styles.span}>Forgot password?</span>
    </div>
    <button onClick={handleSubmit} className={styles["button-submit"]}>Sign In</button>


</form>
  );
}

export default Signin;
