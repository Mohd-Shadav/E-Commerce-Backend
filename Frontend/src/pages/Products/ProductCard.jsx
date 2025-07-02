// ProductCard.jsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Box,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useMediaQuery,
  useTheme,
  MenuItem,
} from "@mui/material";

const ProductCard = ({ product, onView, onEdit, onDelete }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [form, setForm] = useState({ ...product });

  const handleViewOpen = () => setOpenView(true);
  const handleViewClose = () => setOpenView(false);
  const handleEditOpen = () => {
    setForm({ ...product });
    setOpenEdit(true);
  };
  const handleEditClose = () => setOpenEdit(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    onEdit(form); // pass updated product object
    setOpenEdit(false);
  };

  return (
    <>
      <Card
        elevation={6}
        sx={{
          borderRadius: 3,
          boxShadow:
            "0 12px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.03)",
          },
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={product.image || "https://via.placeholder.com/400x200"}
          alt={product.name}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ID: {product.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category: {product.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ${product.price}
          </Typography>
          <Typography
            variant="body2"
            color={product.status === "In-Stock" ? "success.main" : "error.main"}
            fontWeight={500}
          >
            Status: {product.status || "In-Stock"}
          </Typography>

          <Box mt={2}>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" size="small" onClick={handleViewOpen}>
                View
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleEditOpen}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => onDelete(product.id)}
              >
                Delete
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      {/* View Modal */}
      <Dialog open={openView} onClose={handleViewClose} fullScreen={fullScreen}>
        <DialogTitle>{product.name} - Details</DialogTitle>
        <DialogContent>
          <img
            src={product.image || "https://via.placeholder.com/400x200"}
            alt={product.name}
            style={{ width: "100%", borderRadius: 8, marginBottom: 16 }}
          />
          <Typography gutterBottom>ID: {product.id}</Typography>
          <Typography gutterBottom>Category: {product.category}</Typography>
          <Typography gutterBottom>Price: ${product.price}</Typography>
          <Typography gutterBottom>Status: {product.status}</Typography>
          <Typography gutterBottom>Description: {product.description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={openEdit} onClose={handleEditClose} fullScreen={fullScreen}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Price"
            name="price"
            value={form.price}
            onChange={handleChange}
            fullWidth
            type="number"
          />
          <TextField
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Status"
            name="status"
            select
            value={form.status}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="In-Stock">In-Stock</MenuItem>
            <MenuItem value="Out-Stock">Out-Stock</MenuItem>
          </TextField>
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            label="Image URL"
            name="image"
            value={form.image}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductCard;
