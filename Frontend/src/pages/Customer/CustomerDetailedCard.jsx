import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios' 

function CustomerDetailedCard() {

    const userID = useParams()

    const fetchUser = async()=>{

        console.log(userID)

        let {id} = userID;
            
        const res = await axios.get(`http://localhost:3000/api/users/get-user/${id}`)


        console.log(res)
    }

  useEffect(()=>{

    fetchUser()

  },[])

  return (
    <div>CustomerDetailedCard</div>
  )
}

export default CustomerDetailedCard