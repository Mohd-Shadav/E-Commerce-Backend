import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Divider,
  Paper,
  Button,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function OrderDetailsPage() {
  const { state } = useLocation();
  const order = state;

  useEffect(() => {
    console.log("Order Details State:", state);
  }, []);

  if (!order) return <Typography mt={4} align="center">No order data found.</Typography>;

  const placedDate = new Date(order.placedAt).toLocaleString();

  return (
    <Box
      sx={{
        width:"70%",
        backgroundColor: "#f5f7fa",
        py: 6,
        px: 2,
      }}
    >

      <Card
        sx={{
           
          margin: "auto",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        
       
        <CardContent>
             <Link to={'/orders'}>
        <Button variant="contained" color="error">
            Back
        </Button>
        </Link>
          {/* Header */}
          <Typography variant="h4" mb={3} textAlign="center" fontWeight={600}>
            Order Details
          </Typography>

          {/* User Info */}
          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 2,
              background: "#ffffff",
              mb: 3,
            }}
          >
            <Typography variant="h6" gutterBottom>
              👤 Ordered by: {order.user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {order.user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Placed on: {placedDate}
            </Typography>
          </Paper>

          {/* Order Summary */}
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              🧾 Order Summary
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Order ID: <strong>{order._id}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Payment Status: {order.paymentStatus}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Order Status: {order.orderStatus}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Amount: ₹{order.totalAmount}
            </Typography>
          </Paper>

          {/* Shipping Address */}
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              📦 Shipping Address
            </Typography>
            <Typography variant="body2">
              {order.shippingAddress.houseno}, {order.shippingAddress.street},{" "}
              {order.shippingAddress.landmark}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.state} - {order.shippingAddress.pincode}
            </Typography>
          </Paper>

          {/* Product Items */}
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              🛍️ Items Ordered
            </Typography>

            {order.items.map((item, idx) => (
              <Grid
                container
                spacing={2}
                key={idx}
                alignItems="center"
                sx={{
                  mb: 2,
                  p: 1,
                  borderRadius: 2,
                  background: "#f0f4f8",
                }}
              >
                <Grid item>
                  <Avatar
                    variant="rounded"
                    src={item.product.images.thumbnail}
                    sx={{ width: 72, height: 72 }}
                  />
                </Grid>
                <Grid item xs>
                  <Typography variant="body1" fontWeight={500}>
                    {item.product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Variant: {item.variant} | Qty: {item.quantity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ₹{item.price} x {item.quantity} = ₹
                    {item.price * item.quantity}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Paper>
        </CardContent>
      </Card>
    </Box>
  );
}
