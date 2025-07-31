import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const GlassCard = styled(Card)(({ theme,bgColor }) => ({
    borderRadius: 20,
    // boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
    background: bgColor || 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(6px)',
    padding: theme.spacing(3),
    transition: 'transform 0.25s cubic-bezier(.21,1.02,.73,1), box-shadow 0.25s',
    cursor: 'pointer',
    '&:hover': {
        transform: 'scale(1.04) perspective(600px) rotateX(2deg) rotateY(1deg)',
        boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.20)',
    },
    display: 'flex',
    alignItems: 'center',
    minWidth: 220,
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
        minWidth: 0,
    },
   
}));

const IconWrapper = styled(Avatar)(({ theme }) => ({
    background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
    color: theme.palette.primary.main,
    width: 56,
    height: 56,
    marginRight: theme.spacing(2),
    boxShadow: '0 2px 8px rgba(33, 150, 243, 0.10)',
    [theme.breakpoints.down('sm')]: {
        width: 44,
        height: 44,
        marginRight: theme.spacing(1.5),
    },
}));

const OrderCard = ({ label, value,color, icon,totalorders }) => {

    

    return (
           <GlassCard bgColor={color}>
        <IconWrapper>
            {icon}
        </IconWrapper>
        <CardContent sx={{ padding: 0, flex: 1 }}>
            <Typography variant="subtitle2" color="text.secondary"  gutterBottom>
                {label}
            </Typography>
            <Typography variant="h5" fontWeight={700}>
                {label==="Total Orders" ? totalorders : value}
            </Typography>
        </CardContent>
    </GlassCard>

    )
}
 


OrderCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.node.isRequired,
};

export default OrderCard;