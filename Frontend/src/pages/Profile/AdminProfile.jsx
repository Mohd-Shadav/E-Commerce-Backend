// src/pages/Admin/AdminProfile.jsx

import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Avatar,
  Paper,
  Grid,
} from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getAdminData } from '../../store/slice';

const AdminProfile = ({ isDark }) => {
  const [adminData, setAdminData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    // You can send updated data to backend here
     try{
        let data = await axios.put("http://localhost:3000/api/admin/update-admin",adminData,{
          withCredentials:true,
          headers:{
            "Content-Type" : "application/json"
          }
        })

        setEditMode(false);
        alert("Admin Updated Successfully...")

     }catch(error)
     {
      alert("Something went wrong...")

     }


  
  };

  const handleEditToggle = () => {
    setEditMode(true);
  };

  useEffect(() => {
    const getAdmin = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/verify-admin", {
          withCredentials: true,
        });
        setAdminData(res.data.adminData);
       

      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getAdmin();
  }, [setEditMode]);

  if (isLoading) {
    return <Typography>Loading admin profile...</Typography>;
  }

  return (
    <Box sx={{ width: '100%', px: 2, boxShadow: 'none' }}>
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          boxShadow: 'none',
          color: isDark ? "#fff" : "#252525",
          background: isDark ? "#252525" : "#fff"
        }}
      >
        <Box display="flex" justifyContent="center" mb={3}>
          <Avatar
            src={adminData.image || ""}
            alt={adminData.name || ""}
            sx={{ width: 100, height: 100 }}
          />
        </Box>

        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
          {adminData.name || "Admin"}
        </Typography>

        <Grid container direction="column" spacing={2} mt={2}>
          {[
            { label: "Full Name", name: "name" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phone" },
            { label: "Role", name: "role" },
            { label: "Location", name: "location" },
          ].map((field) => (
            <Grid item xs={12} key={field.name}>
              <TextField
                label={field.label}
                name={field.name}
                type={field.type || "text"}
                fullWidth
                value={adminData[field.name] || ""}
                onChange={handleChange}
                InputProps={{
                  readOnly: !editMode,
                  sx: {
                    color: isDark ? '#fff' : '#222',
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    color: isDark ? '#ccc' : '#555',
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: isDark ? '#666' : '#ccc',
                    },
                    '&:hover fieldset': {
                      borderColor: isDark ? '#888' : '#888',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: isDark ? '#fff' : '#000',
                    },
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>

        <Box mt={4} display="flex" justifyContent="center" gap={2}>
          {editMode ? (
            <>
              <Button variant="contained" color="success" onClick={handleSave}>
                Save
              </Button>
              <Button variant="outlined" color="error" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={handleEditToggle}>
              Edit Profile
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminProfile;
