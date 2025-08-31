import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios' 
import { Avatar, Box, Typography } from '@mui/material'

function CustomerDetailedCard() {

    const userID = useParams()
    const [user,setUser] = React.useState([])
    const [userAddress,setUserAddress] = React.useState([])
    const [orders,setOrders] = React.useState([])

    const fetchUser = async()=>{

      

        let {id} = userID;
            
        const res = await axios.get(`http://localhost:3000/api/users/get-user/${id}`)

           
            setUser(res.data)
         if(res?.data?.address?.length>1)
         {
           let add = res?.data?.address?.filter((item)=>item.isDefault) 
           setUserAddress(add[0])

         }else{
          let add = res?.data?.address
          setUserAddress(add[0])
         }
           
        console.log(res.data)
           setOrders(res.data.orders)
    }

  useEffect(()=>{

    fetchUser()

  },[])

  return (
    <Box sx={{width:"100%",m:"auto",mt:2,p:2}}>

      <Box sx={{width:"80%",m:"auto",p:4,borderRadius:"10px"}}> 
     <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",gap:"2rem",mb:4}}>
        <Avatar sx={{width:"100px",height:"100px",fontSize:"2rem",backgroundColor:`#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}8c`}} >{user?.name?.slice(0,1)}</Avatar>
      <Typography variant='h4'>{user.name}</Typography>
     </Box>



<Box sx={{display:"flex",flexDirection:'column'}}>


     <Box sx={{border:'1px solid #25252558',p:2,borderRadius:"10px 10px 0 0"}}>
       <Typography variant='h6'>userid : {user._id} </Typography>
      <Typography variant='h6'>Email: {user.email}</Typography>
      <Typography variant='h6'>Phone: {user.mobile}</Typography>
      <Typography variant='h6'>Address:{`${userAddress?.houseno},${userAddress?.street} ${userAddress?.landmark},${userAddress?.city},${userAddress?.district},${userAddress?.pincode},${userAddress?.state?.toUpperCase()}`}</Typography>
      <Typography variant='h6'>Country: {userAddress?.country?.toUpperCase()}</Typography>
     </Box>

   
      <Box sx={{border:'1px solid #25252558',p:2,borderTop:"none"}}>
        <Typography variant='h5'>Cart :</Typography>
        {user?.cart?.length>0 ? (
          user.cart.map((item,index)=>(
            <Box sx={{display:"flex",gap:2,mt:2,boxShadow:"0 0 3px #25252558",p:2,borderRadius:"10px"}}>
           <img src={item?.product?.images?.thumbnail} alt="Product image" style={{height:"200px",width:"200px",objectFit:"cover",borderRadius:"10px"}}/>
         <Box>
           <Typography variant='h5'>{item?.product?.name}</Typography>
          <Typography variant='h6'>Quantity: {item?.quantity} </Typography>
          <Typography variant='h6'>Price:{item?.price}</Typography>
          </Box>
        </Box>
        ))):(
          <Typography variant='h6' color="error">No Items in Cart</Typography>
        )}
        </Box>

          <Box sx={{border:'1px solid #25252558',p:2,borderTop:"none",borderRadius:"0 0 10px 10px"}}>
        <Typography variant='h5'>Orders :</Typography>
        {orders.length > 0 ? (
          orders.map((item,index)=>(
            <Box sx={{display:"flex",flexDirection:"column",gap:2,mt:2,boxShadow:"0 0 3px #25252558",p:2,borderRadius:"10px"}}>
          <Typography variant='h6'>Order id : </Typography>
          <Typography variant='h6'>Product :  </Typography>
          <Typography variant='h6'>Price: </Typography>
           <Typography variant='h6'>Status: </Typography>
        </Box>
          ))
        ):(
          <Typography variant='h6' color="error">No Orders Yet</Typography>
        )}
        </Box>
        </Box>

</Box>

    </Box>
  )
}

export default CustomerDetailedCard