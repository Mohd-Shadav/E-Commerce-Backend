// src/pages/Customer/Customer.jsx

import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Container,
} from '@mui/material';
import CustomerCard from './CustomerCard';

const customers = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+1 555-123-4567',
    avatar: '/images/customers/alice.jpg',
    location: 'New York, USA',
    rating: 5,
    testimonial: 'Fantastic service and amazing products!',
  },
  {
    name: 'Bob Smith',
    email: 'bob@example.com',
    phone: '+44 777-654-3210',
    avatar: '/images/customers/bob.jpg',
    location: 'London, UK',
    rating: 4,
    testimonial: 'Good quality, will order again.',
  },
  {
    name: 'Sana Malik',
    email: 'sana.malik@gmail.com',
    phone: '+91 98765-43210',
    avatar: '/images/customers/sana.jpg',
    location: 'Delhi, India',
    rating: 5,
    testimonial: 'Amazing customer support!',
  },
  {
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+61 455-678-999',
    avatar: '/images/customers/john.jpg',
    location: 'Sydney, Australia',
    rating: 4,
    testimonial: 'Product quality was excellent!',
  },
];

const Customer = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
          Our Customers
        </Typography>

        <Grid container spacing={4}>
          {customers.map((customer, idx) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
              <CustomerCard {...customer} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Customer;
