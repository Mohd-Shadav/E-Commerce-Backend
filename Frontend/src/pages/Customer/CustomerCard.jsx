// src/pages/Customer/CustomerCard.jsx

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Rating,
} from '@mui/material';

const CustomerCard = ({ name, email, phone, location, rating, avatar, testimonial }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `rotateY(${x * 0.03}deg) rotateX(${y * -0.03}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
  };

  return (
    <Box sx={{ perspective: '1000px' }}>
      <Card
        ref={cardRef}
        className="card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        sx={{
          transition: 'transform 0.4s',
          transformStyle: 'preserve-3d',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
          boxShadow: 4,
          cursor: 'default',
          p: 2,
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Avatar src={avatar} alt={name} sx={{ width: 56, height: 56 }} />
            <Box>
              <Typography variant="h6">{name}</Typography>
              <Typography variant="body2" color="text.secondary">{location}</Typography>
            </Box>
          </Box>

          <Typography variant="body2" fontWeight={500}>
            📞 {phone}
          </Typography>
          <Typography variant="body2" fontWeight={500} gutterBottom>
            📧 {email}
          </Typography>

          {testimonial && (
            <Typography variant="body2" mt={1}>"{testimonial}"</Typography>
          )}

          <Rating value={rating} readOnly sx={{ mt: 1 }} />
        </CardContent>
      </Card>
    </Box>
  );
};

CustomerCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  testimonial: PropTypes.string,
};

export default CustomerCard;
