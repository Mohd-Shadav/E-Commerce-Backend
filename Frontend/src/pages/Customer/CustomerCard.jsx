// UserCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Divider,
  Chip,
} from "@mui/material";

const UserCard = ({ user }) => {
  const { _id, name, email, mobile, cart, address, orders } = user;



  const primaryAddress = address?.[0];
  const latestOrder = orders?.[orders.length - 1];

  return (
    <Card
      sx={{
        width:"100%",
        m: 2,
        p: 2,
        borderRadius: 3,
        boxShadow: 5,
        transition: "all 0.3s ease",
        ":hover": { boxShadow: 10 },
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          User Info
        </Typography>
        <Stack spacing={1}>
          <Typography variant="body2">ID: {_id}</Typography>
          <Typography>Name: {name}</Typography>
          <Typography>Email: {email}</Typography>
          <Typography>Mobile: {mobile}</Typography>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Address
        </Typography>
        {primaryAddress ? (
          <Stack spacing={0.5}>
            <Typography>
              {primaryAddress.houseno}, {primaryAddress.street}
            </Typography>
            <Typography>
              {primaryAddress.landmark}, {primaryAddress.city},{" "}
              {primaryAddress.state} - {primaryAddress.pincode}
            </Typography>
            <Typography>
              {primaryAddress.country} ({primaryAddress.type})
            </Typography>
          </Stack>
        ) : (
          <Typography>No address found.</Typography>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Cart Items ({cart?.length || 0})
        </Typography>
        {cart?.map((item, idx) => (
          <Typography key={item._id}>
            {idx + 1}. Product ID: {item.product}, Qty: {item.quantity}
          </Typography>
        ))}

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Orders ({orders?.length || 0})
        </Typography>
        {latestOrder ? (
          <Box>
            <Typography>
              Order ID: {latestOrder.orderDetails?.orderId}
            </Typography>
            <Typography>Status: {latestOrder.status}</Typography>
            <Typography>Price: ₹{latestOrder.price}</Typography>
            {latestOrder.product?.map((prod, i) => (
              <Typography key={i}>
                - {prod.quantity} x {prod.variant}
              </Typography>
            ))}
          </Box>
        ) : (
          <Typography>No orders yet.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default UserCard;
