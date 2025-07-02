import React from 'react';
import Sidebar from './Components/Sidebar';
// import TopBar from './Components/TopBar';
import { Box } from '@mui/material';
import './App.css'; // Import your CSS file for styling
import TopBar from './Components/TopBar';
import { useState } from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Order from './pages/Orders/Order';
import Product from './pages/Products/Product';
import Customer from './pages/Customer/Customer';
import AdminProfile from './pages/Profile/AdminProfile';
import Signin from './pages/Auth/Signin';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <>
    <BrowserRouter>
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
          <Route path="/" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/products" element={<Product />} />
          <Route path="/customers" element={<Customer />} />
          <Route path='/profile' element={<AdminProfile />} />
        </Routes>
       </div>

      </div>
         </div>
         </BrowserRouter>
    </>
  );
}

export default App;
