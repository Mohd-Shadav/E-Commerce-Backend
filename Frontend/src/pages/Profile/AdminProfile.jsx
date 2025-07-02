// src/pages/Admin/AdminProfile.jsx

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Avatar,
  Paper,
  Grid,
} from '@mui/material';
import { col } from 'framer-motion/client';

const initialAdminData = {
  name: 'Mohd Shadav',
  email: 'admin@example.com',
  phone: '+91 98765-43210',
  role: 'Super Admin',
  location: 'Lucknow, India',
  avatar: '/images/admin/admin.jpg',
};

const AdminProfile = () => {
  const [adminData, setAdminData] = useState(initialAdminData);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(adminData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setAdminData(formData);
    setEditMode(false);
  };

  const handleEditToggle = () => {
    setFormData(adminData);
    setEditMode(true);
  };

  return (
    <Box sx={{ width: '100%', px: 2 ,boxShadow:'none'}}>
      <Paper  sx={{ p: 4, borderRadius: 4,boxShadow:'none' }}>
        <Box display="flex"  justifyContent="center" mb={3}>
          <Avatar
            src={adminData.avatar}
            alt={adminData.name}
            sx={{ width: 100, height: 100 }}
          />
        </Box>

        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
          Admin Profile
        </Typography>

        <Grid container direction="column" spacing={2} mt={2}>
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              InputProps={{ readOnly: !editMode }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              InputProps={{ readOnly: !editMode }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Phone"
              name="phone"
              fullWidth
              value={formData.phone}
              onChange={handleChange}
              InputProps={{ readOnly: !editMode }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Role"
              name="role"
              fullWidth
              value={formData.role}
              onChange={handleChange}
              InputProps={{ readOnly: !editMode }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Location"
              name="location"
              fullWidth
              value={formData.location}
              onChange={handleChange}
              InputProps={{ readOnly: !editMode }}
            />
          </Grid>
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
