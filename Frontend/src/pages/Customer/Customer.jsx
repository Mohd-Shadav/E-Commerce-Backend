import React, { useEffect, useState } from 'react'
import CustomerCard from './CustomerCard'
import axios from 'axios'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box, Button, Popover, TextField, Typography } from '@mui/material'
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { set } from 'mongoose';
import NoResultFound from '../NoResultFound/NoResultFound';


function Customer() {


  const [user,setUser] = useState([])
  const [filterUsers,setFilterUsers] = useState(user)
  const[sortValue,setSortValue] = useState("Name")


  const handleSort = (e)=>{
    setSortValue(e.target.value)
  }


   const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


const fetchCustomers = async()=>{
  let res = await axios.get('http://localhost:3000/api/users/get-users');


  if(sortValue==="Newest")
  {
    let sortedUsers = [...res.data].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
    setUser(sortedUsers)
      setFilterUsers(sortedUsers)
    return;

  }else if(sortValue==="Oldest"){
    let sortedUsers = [...res.data].sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt))
    setUser(sortedUsers)
      setFilterUsers(sortedUsers)
    return;

  }else{
    let sortedUsers = [...res.data].sort((a,b)=>a.name.localeCompare(b.name))
    setUser(sortedUsers)
    setFilterUsers(sortedUsers)
    return;
  }

 
}

const handleQuerySearch = (e)=>{

  

  let filteredUser = user.filter((item)=>{
    return item.name.toLowerCase().includes(e.target.value.toLowerCase()) || item.email.toLowerCase().includes(e.target.value.toLowerCase())
  })


  if(filteredUser.length>0)
  {
    setFilterUsers(filteredUser)
  }else{  
    setFilterUsers([])

  }

  

}

useEffect(()=>{
fetchCustomers()


},[sortValue])

  return (
    <div style={{width:"80%"}}>
     <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",mb:2,px:3,py:1}}>
      <TextField label="Search User by name,email" size='small' onChange={handleQuerySearch}/> 
      <Button sx={{display:"flex",alignItems:"center",gap:1,cursor:"pointer",boxShadow:"0px 0px 2px gray",background:'#e5e5e569',color:"#252525",p:2,borderRadius:2,height:"20px","&:active": {
      transform: "scale(0.8)", // little zoom effect
    },}}  onClick={handleClick} aria-describedby={id} >
        <ImportExportIcon style={{fontWeight:"900"}}/>
        <span style={{fontFamily:"sans-serif"}}>Sort</span>
        </Button>  

         <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{p:2,display:"flex",flexDirection:"column",gap:2}}>
         

             <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Sort By</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="Name"
        name="radio-buttons-group"
        value={sortValue}
        onChange={handleSort}
      >
        <FormControlLabel value="Name" control={<Radio />} label="Name" />
        <FormControlLabel value="Newest" control={<Radio />} label="Newest" />
        <FormControlLabel value="Oldest" control={<Radio />} label="Oldest" />
      </RadioGroup>
    </FormControl>
        
       </Box>
      </Popover>

     </Box>

      {filterUsers.length>0 ? (filterUsers.map((item)=>{
        return (<CustomerCard user={item}/>)
      })):(
       <NoResultFound/>
      )}
    </div>
  )
}

export default Customer
