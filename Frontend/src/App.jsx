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
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminData, login, logout } from './store/slice';
import Categories from './pages/Category/Categories';
import Signup from './pages/Auth/Signup';
import OrderDetailsCard from './pages/Orders/OrderDetailsCard';
import ReactSkeleton from './components/ReactSkeleton';
import CustomerDetailedCard from './pages/Customer/CustomerDetailedCard';


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isLoggedIn = useSelector(state=>state.loggedInStatus.value);
  const theme = useSelector(state=>state.themeStatus.value);
  const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
 

  const verification = async()=>{
   try {
        const res = await axios.get("http://localhost:3000/api/admin/verify-admin", {
          withCredentials: true,
        });

        if (res.status === 200) {
          dispatch(getAdminData({
          adminName:res.data.adminData.name,
          adminPic:res.data.adminData.image
        }))
          dispatch(login());
       

       
        } else {
          dispatch(logout());
        }
      } catch (err) {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
  }


  useEffect(()=>{

  console.log("hii")
   
    verification();
    

  },[dispatch,theme])


 if (loading)
  return (
    <div className="loader-wrapper">
      <span className="loader"></span>
 
    </div>
  );


  return (
    <>
    <BrowserRouter>

{!isLoggedIn ? (
     <div className="auth-container-admin">
     <Routes>
      <Route path='/' element={<Signin/>}/>
      {/* <Route path='/' element={<Signup/>}/> */}
     
      
    </Routes>
   </div>
):(
      <div className="main-container"  style={theme ? {background:"#252525",color:"#fff !important"}:{background:"#fff",color:"#252525 !important"}}>
      <div className="">
        <Sidebar  open={isSidebarOpen} setOpen={setIsSidebarOpen} isDark={theme}/>
      </div>

      <div className="top-content-container"  style={theme ? {background:"#252525",color:"#fff"}:{background:"#fff",color:"#252525"}}>
       
       <div className="topbar-container"  style={theme ? {background:"#252525",color:"#fff"}:{background:"#fff",color:"#252525"}}>
        <TopBar/>
       </div>
       <div className="content-container"  style={theme ? {background:"#252525",color:"#fff"}:{background:"#fff",color:"#252525"}}>
        <Routes>
     
          <Route path="/dashboard" element={<Dashboard isDark={theme}/>} />
          <Route path="/orders" element={<Order isDark={theme}/>} />
          <Route path="/products" element={<Product isDark={theme}/>} />
           <Route path="/categories" element={<Categories isDark={theme}/>} />
          <Route path="/customers" element={<Customer isDark={theme}/>} />
          <Route path='/profile' element={<AdminProfile isDark={theme}/>} />
          <Route path='/order-details' element={<OrderDetailsCard/>}/>

          <Route path='/admin/customers/:id' element={<CustomerDetailedCard/>}/>
          <Route path="*" element={<Dashboard/>}/>
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
