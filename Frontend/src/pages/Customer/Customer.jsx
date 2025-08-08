import React, { useEffect, useState } from 'react'
import CustomerCard from './CustomerCard'
import axios from 'axios'
import { Box, TextField } from '@mui/material'

function Customer() {


  const [user,setUser] = useState([])

const fetchCustomers = async()=>{
  let res = await axios.get('http://localhost:3000/api/users/get-users');

  setUser(res.data)
 
}

useEffect(()=>{
fetchCustomers()
},[])

  return (
    <div style={{width:"80%"}}>
     <Box>
      <TextField label="Search User by name,email"/>    

     </Box>

      {user.map((item)=>{
        return (<CustomerCard user={item}/>)
      })}
    </div>
  )
}

export default Customer
