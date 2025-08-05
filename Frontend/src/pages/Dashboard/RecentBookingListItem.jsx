import { Avatar, AvatarGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";

// Example data
const bookings = [
    {
        id: 1,
        service: "AC Repair",
        date: "15 June",
        price: "₹500",
        status: "Scheduled",
    },
    {
        id: 2,
        service: "Plumbing",
        date: "10 June",
        price: "₹300",
        status: "Completed",
    },
    {
        id: 3,
        service: "Cleaning",
        date: "8 June",
        price: "₹400",
        status: "Cancelled",
    },
];

// Status styles and icons
const statusMap = {
    Scheduled: {
        color: "#007bff",
        icon: "⏳",
        bg: "#e7f1ff",
    },
    Completed: {
        color: "#28a745",
        icon: "✅",
        bg: "#eafaf1",
    },
    Cancelled: {
        color: "#dc3545",
        icon: "❌",
        bg: "#fdeaea",
    },
};

const RecentBookingListItem = ({isDark,order}) => (
    <TableContainer sx={{
    backgroundColor: isDark ? "#1e1e1e" : "#fff",
    color: isDark ? "#fff" : "#252525",
    borderRadius: 2,
  }}>
               <Table sx={{ backgroundColor: isDark ? "#1e1e1e" : "#fff" }}>
  <TableHead>
    <TableRow sx={{ backgroundColor: isDark ? "#2c2c2c" : "#f5f5f5" }}>
      <TableCell sx={{ color: isDark ? "#fff" : "#252525" }}>Order ID</TableCell>
       <TableCell sx={{ color: isDark ? "#fff" : "#252525" }}>Product</TableCell>
       <TableCell sx={{ color: isDark ? "#fff" : "#252525" }}>Quantity</TableCell>
      <TableCell sx={{ color: isDark ? "#fff" : "#252525" }}>Customer Name</TableCell>
      <TableCell sx={{ color: isDark ? "#fff" : "#252525" }}>Date</TableCell>
      <TableCell sx={{ color: isDark ? "#fff" : "#252525" }}>Amount</TableCell>
      <TableCell sx={{ color: isDark ? "#fff" : "#252525" }}>Status</TableCell>
      {/* <TableCell sx={{ color: isDark ? "#fff" : "#252525" }} align="right">Actions</TableCell> */}
    </TableRow>
  </TableHead>

  <TableBody>
    {order.length === 0 ? (
      <TableRow>
        <TableCell colSpan={8} align="center" sx={{ color: isDark ? "#aaa" : "#666" }}>
          No orders found.
        </TableCell>
      </TableRow>
    ) : (
      order.map((order,idx) => (
      
        <TableRow
         
          key={order.orderId||idx}
          sx={{
            "&:hover": {
              backgroundColor: isDark ? "#333" : "#f9f9f9",
            },
          }}
        >
          <TableCell sx={{ color: isDark ? "#fff" : "#252525" }}>{ order.orderId && order.orderId.slice(0,3).toUpperCase()+"..." + order.orderId.slice(16,20)  || idx}</TableCell>
          <TableCell sx={{ color: isDark ? "#fff" : "#252525" }}>
            {order?.items?.length<=1 ? (
                //  <img src={order.items[0].product.images.thumbnail} alt="" width={50} height={50} style={{objectFit:"cover"}}/>
                   <Avatar alt="Remy Sharp" src={order.items[0].product.images.thumbnail} sx={{cursor:"pointer"}}
       onClick={() => navigate('/order-details', {state: order })}/>
            ):(
              <div className="" style={{width:"50px",height:"50px",objectFit:"cover",display:"flex"}}>
               <AvatarGroup max={2}>
  {order.items.map((item, index) => (
    <Avatar
      key={index}
      alt={`Product ${index + 1}`}
      src={item.product.images.thumbnail}
      sx={{cursor:"pointer"}}
       onClick={() => navigate('/order-details', {state: order })}
    />
  ))}
</AvatarGroup>
                  
                  
              </div>

            )}
           
          </TableCell>
          <TableCell sx={{ color: isDark ? "#fff" : "#252525" }}>
 {order.items.map((item) => item.quantity).join(" + ")}
          </TableCell>
          <TableCell sx={{ color: isDark ? "#fff" : "#252525" }}>{order.user.name}</TableCell>
          <TableCell sx={{ color: isDark ? "#fff" : "#252525" }}>
            {new Date(order.placedAt).toLocaleDateString()}
          </TableCell>
          <TableCell sx={{ color: isDark ? "#fff" : "#252525" }}>₹ {order.totalAmount}</TableCell>
       <TableCell sx={{ color: isDark ? "#fff" : "#252525" }}>
   {order.orderStatus}
</TableCell>
          {/* <TableCell align="right">
            <IconButton>
              <MoreVertIcon sx={{ color: isDark ? "#fff" : "#252525" }} />
            </IconButton>
          </TableCell> */}
        </TableRow>
    
      ))
    )}
  </TableBody>
</Table>

            </TableContainer>
);

export default RecentBookingListItem;