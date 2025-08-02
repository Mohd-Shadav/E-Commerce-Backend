import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'

import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import OrderCard from "./OrderCard"; // Assume this component exists
import {
Box,
Typography,
Grid,
Paper,
TextField,
InputAdornment,
Select,
MenuItem,
FormControl,
InputLabel,
Table,
TableBody,
TableCell,
TableContainer,
TableHead,
TableRow,
Chip,
IconButton,
Pagination,
Stack,
AvatarGroup,
Avatar,
} from "@mui/material";

import axios from 'axios'
import { useEffect } from "react";
import { ShoppingCart, LocalShipping, CheckCircle, Pending } from '@mui/icons-material';

// Mock data


const orderStatusColors = {
Delivered: "success",
Pending: "warning",
Cancelled: "error",
Booked:"primary"
};

const mockOrders = [
{
    id: "ORD-1001",
    customer: "John Doe",
    date: "2024-06-01",
    amount: "$120.00",
    status: "Delivered",
},
{
    id: "ORD-1002",
    customer: "Jane Smith",
    date: "2024-06-02",
    amount: "$80.00",
    status: "Pending",
},
{
    id: "ORD-1003",
    customer: "Alice Johnson",
    date: "2024-06-03",
    amount: "$150.00",
    status: "Cancelled",
},
{
    id: "ORD-1004",
    customer: "Bob Brown",
    date: "2024-06-04",
    amount: "$200.00",
    status: "Delivered",
},
// Add more mock orders as needed
];

const statusOptions = ["All","Booked", "Delivered", "Cancelled"];

const PAGE_SIZE = 5;

const Order = ({isDark}) => {
const [search, setSearch] = useState("");
const [status, setStatus] = useState("All");
const [page, setPage] = useState(1);
const [orders,setOrders] = useState([]);
const [userID,setUserID] = useState("");
const [user,setUser] = useState([]);
const [summaryData,setSummaryData] = useState([]);
const [filteredOrders,setFilteredOrders] = useState([]);
const [paginatedOrders,setPaginatedOrders] = useState([]);
const navigate = useNavigate();
// Filter and paginate orders

// const paginatedOrders = filteredOrders.slice(
//     (page - 1) * PAGE_SIZE,
//     page * PAGE_SIZE
// );



const getAllOrders = async () => {

  try{
    let res = await axios.get('http://localhost:3000/api/orders/get-all-orders');
    
    setOrders(res.data);




    
    



  }catch(err)
  {
    alert("failed to load orders...")

  }

}




useEffect(()=>{

  getAllOrders();


},[])

useEffect(() => {
  const filtered = orders?.filter(
    (order) =>
      (status === "All" || order.orderStatus?.toLowerCase() === status.toLowerCase()) &&
      (
        order?.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        order?.orderId?.toLowerCase().includes(search.toLowerCase())
      )
  );

  setFilteredOrders(filtered);
  setPaginatedOrders(
    filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  );
}, [search, status, orders, page]);


useEffect(() => {
  if (!orders || orders.length === 0) return;

  let deliveredLength = orders.filter(item => item.orderStatus?.trim().toLowerCase() === "delivered");
  let bookedLength = orders.filter(item => item.orderStatus?.trim().toLowerCase() === "booked");
  let cancelledLength = orders.filter(item => item.orderStatus?.trim().toLowerCase() === "cancelled");

  setSummaryData([
    { label: "Total Orders", value: orders.length,icon:<ShoppingCart/>, color: '#e3f2fd' },
    { label: "Delivered", value: deliveredLength.length,icon:<LocalShipping/>, color: '#e8f5e9' },
    { label: "Booked", value: bookedLength.length,icon:<CheckCircle/>, color: '#fffde7' },
    { label: "Cancelled", value: cancelledLength.length,icon:<Pending/>, color: '#ffebee' },
  ]);
}, [orders]);

return (
    <Box sx={{ p: { xs: 2, md: 4 }, minHeight: "100vh",width: "100%",marginTop: "-20px" }}>
        {/* Top Section */}
        <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 3 }}
        >
            <Grid item xs={12} md={3}>
                <Typography variant="h5" fontWeight={700}>
                    Orders
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search by customer or order ID"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ bgcolor: "white", borderRadius: 1 }}
                />
            </Grid>
            <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                    <InputLabel  sx={{
      color: isDark ? "#fff" : "#333",
      fontWeight: 600,
    }}>Status</InputLabel>
                    <Select
                        value={status}
                        label="Status"
                        onChange={(e) => {
                            setStatus(e.target.value);
                            setPage(1);
                        }}
                  sx={{
      bgcolor: isDark ? "#333" : "#fff",
      color: isDark ? "#fff" : "#000",
      borderRadius: 1,
      minWidth: 120,
       '& .MuiOutlinedInput-notchedOutline': {
    borderColor: isDark ? '#777' : '#ccc',
  },
  '& .MuiSvgIcon-root': {
    color: isDark ? '#fff' : '#000',
  }
    }}
                    >
                        {statusOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>

        {/* Summary Cards */}
        <Grid container spacing={2} sx={{ mb: 4,display:"flex",justifyContent:"space-around" }}>
            {summaryData.map((card) => (
                <Grid item xs={12} sm={6} md={3} key={card.label}>
                    <OrderCard
                        label={card.label}
                        value={card.value}
                        color={card.color}
                        icon={card.icon} 
                        totalorders={orders.length}
                    />
                </Grid>
            ))}
        </Grid>

        {/* Orders Table */}
        <Paper elevation={0} sx={{ borderRadius: 2, p: 2, mb: 3 , backgroundColor: isDark ? "#1e1e1e" : "#fff",
    color: isDark ? "#fff" : "#252525",
  }}>
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
      <TableCell sx={{ color: isDark ? "#fff" : "#252525" }} align="right">Actions</TableCell>
    </TableRow>
  </TableHead>

  <TableBody>
    {paginatedOrders.length === 0 ? (
      <TableRow>
        <TableCell colSpan={8} align="center" sx={{ color: isDark ? "#aaa" : "#666" }}>
          No orders found.
        </TableCell>
      </TableRow>
    ) : (
      paginatedOrders.map((order,idx) => (
      
        <TableRow
          onClick={() => navigate('/order-details', {state: order })}
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
                   <Avatar alt="Remy Sharp" src={order.items[0].product.images.thumbnail}/>
            ):(
              <div className="" style={{width:"50px",height:"50px",objectFit:"cover",display:"flex"}}>
               <AvatarGroup max={2}>
  {order.items.map((item, index) => (
    <Avatar
      key={index}
      alt={`Product ${index + 1}`}
      src={item.product.images.thumbnail}
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
          <TableCell>
            <Chip
              label={order.orderStatus}
              color={orderStatusColors[order.orderStatus]}
              size="small"
              sx={{
                fontWeight: 500,
                color: "#fff",
                backgroundColor:
                  order.orderStatus === "Delivered"
                    ? "#4caf50"
                    : order.orderStatus === "Booked"
                    ? "#888686ff"
                    : "#f44336",
              }}
            />
          </TableCell>
          <TableCell align="right">
            <IconButton>
              <MoreVertIcon sx={{ color: isDark ? "#fff" : "#252525" }} />
            </IconButton>
          </TableCell>
        </TableRow>
    
      ))
    )}
  </TableBody>
</Table>

            </TableContainer>
            {/* Pagination */}
            <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                sx={{ mt: 2 }}
            >
                <Pagination
                    count={Math.ceil(filteredOrders.length / PAGE_SIZE)}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    color="primary"
                    shape="rounded"
                     sx={{
      '& .MuiPaginationItem-root': {
        color: isDark ? '#fff' : '#000', // page number color
      },
      '& .MuiPaginationItem-icon': {
        color: isDark ? '#fff' : '#000', // arrow icon color
      },
    }}
                    
                />
            </Stack>
        </Paper>
    </Box>
);
};

export default Order;