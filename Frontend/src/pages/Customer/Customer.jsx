import React, { useEffect, useState } from 'react'
import CustomerCard from './CustomerCard'
import axios from 'axios'

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
      {user.map((item)=>{
        return (<CustomerCard user={item}/>)
      })}
    </div>
  )
}

export default Customer
