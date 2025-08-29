// UserCard.jsx
import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Divider,
  Chip,
  Avatar,
} from "@mui/material";

const UserCard = ({ user }) => {
  const { _id, name, email, mobile, cart, address, orders,createdAt } = user;



  const primaryAddress = address?.[0];
  const latestOrder = orders?.[orders.length - 1];
  const totalBuy = orders.reduce((sum,val)=>{
    return sum+Number(val.orderDetails.price)
  },0)

  useEffect(()=>{
  console.log(latestOrder)

 
  },[])

  return (

    <Link to={`/admin/customers/${user._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Card
      sx={{
        m: 2,
        p: 2,
        border:"none",
        boxShadow:"none",
        borderBottom:"1px solid #e4e3e3ff",
        cursor:"pointer",
   
     
    
      }}
    >
      <CardContent sx={{display:"flex",justifyContent:"space-between"}}>
       <Box sx={{display:"flex",gap:"2rem"}}>
         <Avatar sx={{width:"100px",height:"100px",fontSize:"2rem",backgroundColor:`#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}8c`}} >{name.slice(0,1)}</Avatar>
         <Box>
          <Typography variant="h5">{name.slice(0,1).toUpperCase()+name.slice(1,name.length).toLowerCase()}</Typography>
          <Typography variant="body1">{email}</Typography>
          <Typography variant="body1" color="primary">{mobile}</Typography>
          <Typography variant="body1" color="error">Joined At : { createdAt  ? new Date(createdAt).toISOString().split('T')[0] : "12/3/2025"} </Typography>
         </Box>
       </Box>

       <Box sx={{alignSelf:"center"}}>
        <Typography  variant="body1" sx={{display:"flex",alignItems:"center"}}>Last Order : <Typography variant="body1" color="success">{latestOrder?.createdAt  ? new Date(latestOrder.createdAt).toISOString().split('T')[0] : "No Order Yet"}</Typography></Typography>
         <Typography  variant="body1" sx={{display:"flex",alignItems:"center"}}>Total Buy : <Typography variant="body1" color="error">₹ {totalBuy}</Typography></Typography>
        
       </Box>

      </CardContent>

    </Card></Link>
  );
};

export default UserCard;
