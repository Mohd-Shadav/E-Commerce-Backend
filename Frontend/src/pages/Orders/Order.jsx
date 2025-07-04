import React, { useState } from "react";

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
} from "@mui/material";

// Mock data
const summaryData = [
{ label: "Total Orders", value: 1200, color: "primary" },
{ label: "Delivered", value: 950, color: "success" },
{ label: "Pending", value: 180, color: "warning" },
{ label: "Cancelled", value: 70, color: "error" },
];

const orderStatusColors = {
Delivered: "success",
Pending: "warning",
Cancelled: "error",
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

const statusOptions = ["All", "Delivered", "Pending", "Cancelled"];

const PAGE_SIZE = 5;

const Order = ({isDark}) => {
const [search, setSearch] = useState("");
const [status, setStatus] = useState("All");
const [page, setPage] = useState(1);

// Filter and paginate orders
const filteredOrders = mockOrders.filter(
    (order) =>
        (status === "All" || order.status === status) &&
        (order.customer.toLowerCase().includes(search.toLowerCase()) ||
            order.id.toLowerCase().includes(search.toLowerCase()))
);
const paginatedOrders = filteredOrders.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
);

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
        <Grid container spacing={2} sx={{ mb: 4 }}>
            {summaryData.map((card) => (
                <Grid item xs={12} sm={6} md={3} key={card.label}>
                    <OrderCard
                        label={card.label}
                        value={card.value}
                        color={card.color}
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
        <TableCell colSpan={6} align="center" sx={{ color: isDark ? "#aaa" : "#666" }}>
          No orders found.
        </TableCell>
      </TableRow>
    ) : (
      paginatedOrders.map((order) => (
        <TableRow
          key={order.id}
          sx={{
            "&:hover": {
              backgroundColor: isDark ? "#333" : "#f9f9f9",
            },
          }}
        >
          <TableCell sx={{ color: isDark ? "#fff" : "#252525" }}>{order.id}</TableCell>
          <TableCell sx={{ color: isDark ? "#fff" : "#252525" }}>{order.customer}</TableCell>
          <TableCell sx={{ color: isDark ? "#fff" : "#252525" }}>
            {new Date(order.date).toLocaleDateString()}
          </TableCell>
          <TableCell sx={{ color: isDark ? "#fff" : "#252525" }}>{order.amount}</TableCell>
          <TableCell>
            <Chip
              label={order.status}
              color={orderStatusColors[order.status]}
              size="small"
              sx={{
                fontWeight: 500,
                color: "#fff",
                backgroundColor:
                  order.status === "Delivered"
                    ? "#4caf50"
                    : order.status === "Pending"
                    ? "#ff9800"
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