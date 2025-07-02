// Product.jsx
import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Stack,
  InputAdornment,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ProductCard from "./ProductCard";

const sampleProducts = [
  {
    id: "P001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 99,
    status: "In-Stock",
    description: "High quality wireless headphones",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=facearea&w=400&q=80",
  },
  {
    id: "P001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 99,
    status: "In-Stock",
    description: "High quality wireless headphones",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=facearea&w=400&q=80",
  },
  ,
  {
    id: "P001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 99,
    status: "In-Stock",
    description: "High quality wireless headphones",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=facearea&w=400&q=80",
  },
  ,
  {
    id: "P001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 99,
    status: "In-Stock",
    description: "High quality wireless headphones",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=facearea&w=400&q=80",
  },
  ,
  {
    id: "P001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 99,
    status: "In-Stock",
    description: "High quality wireless headphones",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=facearea&w=400&q=80",
  },
  ,
  {
    id: "P001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 99,
    status: "In-Stock",
    description: "High quality wireless headphones",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=facearea&w=400&q=80",
  },
  ,
  {
    id: "P001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 99,
    status: "In-Stock",
    description: "High quality wireless headphones",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=facearea&w=400&q=80",
  },
  ,
  {
    id: "P001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 99,
    status: "In-Stock",
    description: "High quality wireless headphones",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=facearea&w=400&q=80",
  },
  ,
  {
    id: "P001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 99,
    status: "In-Stock",
    description: "High quality wireless headphones",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=facearea&w=400&q=80",
  },
  {
    id: "P002",
    name: "Sneakers",
    category: "Footwear",
    price: 59,
    status: "Out-Stock",
    description: "Comfortable sneakers for daily wear",
    image:
      "https://images.unsplash.com/photo-1606813903298-2151a1b1849c?auto=format&fit=facearea&w=400&q=80",
  },
];

const categories = ["All", "Electronics", "Footwear", "Fashion"];
const stockStatus = ["All", "In-Stock", "Out-Stock"];

const Product = () => {
  const [products, setProducts] = useState(sampleProducts);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStock, setFilterStock] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddProduct = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      filterCategory === "All" || product.category === filterCategory;
    const matchesStock =
      filterStock === "All" || product.status === filterStock;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStock && matchesSearch;
  });

  return (
    <Box
      p={3}
      sx={{
        height: "800px",
        overflowY: "scroll",
      
        width: "100% !important",
        marginTop: "-13px",
        marginLeft: "0",
      }}
    >
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Products
      </Typography>

      <Grid container spacing={2} mb={3} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Search by name"
            variant="outlined"
            size="small"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <TextField
            select
            label="Category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            size="small"
            sx={{ width: "150px" }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <TextField
            select
            label="Stock"
            value={filterStock}
            onChange={(e) => setFilterStock(e.target.value)}
            size="small"
            sx={{ width: "150px" }}
          >
            {stockStatus.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={3} md={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAddProduct}
          >
            + Add Product
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>

      {/* Add Product Modal */}
      <Dialog
        open={openAddModal}
        onClose={handleCloseAddModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField label="Product Name" name="name" fullWidth />
          <div style={{ display: "flex", gap: "16px" }}>
            <TextField
              label="Discount Price"
              name="discountPrice"
              fullWidth
              type="number"
            />
            <TextField
              label="Original Price"
              name="originalPrice"
              fullWidth
              type="number"
            />
          </div>
          {/*             
               <TextField
                 label="Category"
                 name="category"
             
                 fullWidth
               /> */}

          <div style={{ display: "flex", gap: "16px" }}>
            <TextField
              label="Category"
              name="category"
              select
              sx={{ width: "50%" }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="fashion">Fashion</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="footwear">Footwear</MenuItem>
              <MenuItem value="accessories">Accessories</MenuItem>
              <MenuItem value="books">Books</MenuItem>
            </TextField>

            <TextField
              label="Status"
              name="status"
              select
              sx={{ width: "50%" }}
            >
              <MenuItem value="In-Stock">In-Stock</MenuItem>
              <MenuItem value="Out-Stock">Out-Stock</MenuItem>
            </TextField>
          </div>
          <TextField
            label="Description"
            name="description"
            multiline
            rows={3}
            fullWidth
          />
          <div style={{ display: "flex", gap: "16px" }}>
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              sx={{ width: "50%" }}
            />

            <TextField
              label="Brand"
              name="brand"
              type="text"
              sx={{ width: "50%" }}
            />
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            {/* <label htmlFor="" name="Sizes">Sizes</label> */}

            <TextField label="Small" name="small" type="number" />

            <TextField label="Medium" name="medium" type="number" />

            <TextField label="Large" name="large" type="number" />
            <TextField label="XL" name="extraLarge" type="number" />
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <TextField
              label="Volume(LTR for Liquid Products)"
              name="volume"
              type="number"
              sx={{ width: "50%" }}
            />

            <TextField
              label="Weight in Grams"
              name="weight"
              type="number"
              sx={{ width: "50%" }}
            />
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <TextField
              label="Rating"
              name="rating"
              type="number"
              inputProps={{ min: 0, max: 5, step: 0.1 }}
              sx={{ width: "50%" }}
            />

            <TextField
              label="IsFeatured"
              name="isFeatured"
              sx={{ width: "50%" }}
              select
            >
              <MenuItem value="true">true</MenuItem>
              <MenuItem value="false">false</MenuItem>
            </TextField>
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mt: 2 }}
            >
              Upload Thumbnail Image
              <input type="file" hidden accept="image/*" />
            </Button>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mt: 2 }}
            >
              Upload Product Images
              <input type="file" hidden accept="image/*" multiple />
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModal}>Cancel</Button>
          <Button variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Product;
