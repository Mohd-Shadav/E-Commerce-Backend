import React from 'react';
import Sidebar from './Components/Sidebar';
// import TopBar from './Components/TopBar';
import { Box } from '@mui/material';
import './App.css'; // Import your CSS file for styling
import TopBar from './Components/TopBar';
import { useState } from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Order from './pages/Orders/Order';
import Product from './pages/Products/Product';
import Customer from './pages/Customer/Customer';
import AdminProfile from './pages/Profile/AdminProfile';
import Signin from './pages/Auth/Signin';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [isAuthenticated,setIsAuthenticated] = useState(false);
 

  const verification = async()=>{
    let data = await axios.get("http://localhost:3000/api/admin/verify-admin",{
      withCredentials:true
    });
    console.log(data);

    if(data.status===200)
    {
      setIsAuthenticated(true)
      setIsLoggedIn(true)
      
    }else{
      setIsAuthenticated(false);
      setIsLoggedIn(false)
    }
  }


  useEffect(()=>{

    verification();
    

  },[isLoggedIn,isAuthenticated])


  return (
    <>
    <BrowserRouter>

{!isLoggedIn ? (
     <div className="auth-container-admin">
     <Routes>
      <Route path='/' element={<Signin/>}/>
      
    </Routes>
   </div>
):(
      <div className="main-container">
      <div className="">
        <Sidebar  open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>

      <div className="top-content-container">
       
       <div className="topbar-container">
        <TopBar/>
       </div>
       <div className="content-container">
        <Routes>
     
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/products" element={<Product />} />
          <Route path="/customers" element={<Customer />} />
          <Route path='/profile' element={<AdminProfile />} />
        </Routes>
       </div>

      </div>
         </div>

)

}

         </BrowserRouter>
    </>
  );
}

export default App;
