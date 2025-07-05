// Product.jsx
import React, { useEffect, useState } from "react";
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
import axios from "axios";


const categories = ["All", "Electronics", "Footwear", "Fashion"];
const stockStatus = ["All", "In-Stock", "Out-Stock"];

const Product = ({isDark}) => {
  const [products, setProducts] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStock, setFilterStock] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

const [formData, setFormData] = useState({
  name: "",
  description: "",
  originalprice: 0,
  discountprice: 0,
  status: "In-Stock", // default from schema

  physicalSpecs: {
    size: {
      S:0,
      M:0,
      L:0,
      XL:0
    }, // default is ['M'], because it's an array
    weight: 1,
    volume: 1,
  },

  quantity: 1, // default from schema
  brand: "",
  images: {
    thumbnail: "", // URL or base64 string
    gallery: [],   // array of image strings
  },
  rating: 0,
  reviews: [],
  isFeatured: false,
  category: "", // category ID will be stored here
});
  

  const handleAddProduct = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p._id !== id));
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


 const handleFormChange = (e) => {
  const { name, value, type, files } = e.target;

  // Handle image upload (thumbnail)
  if (name === "thumbnail") {
    const file = files[0];
    setFormData((prev) => ({
      ...prev,
      images: {
        ...prev.images,
        thumbnail: file,
      },
    }));
    return;
  }

  // Handle image gallery
  if (name === "gallery") {
    const fileList = Array.from(files);
    setFormData((prev) => ({
      ...prev,
      images: {
        ...prev.images,
        gallery: fileList,
      },
    }));
    return;
  }

  // Handle physicalSpecs.size
  if (["small", "medium", "large", "extraLarge"].includes(name)) {
    setFormData((prev) => ({
      ...prev,
      physicalSpecs: {
        ...prev.physicalSpecs,
        size: [...prev.physicalSpecs.size.filter((s) => s !== name[0].toUpperCase()), value > 0 ? name[0].toUpperCase() : null].filter(Boolean),
      },
    }));
    return;
  }

  // Handle physicalSpecs.volume or weight
  if (["volume", "weight"].includes(name)) {
    setFormData((prev) => ({
      ...prev,
      physicalSpecs: {
        ...prev.physicalSpecs,
        [name]: value,
      },
    }));
    return;
  }

  // Handle all other flat fields
  setFormData((prev) => ({
    ...prev,
    [name]: type === "number" ? Number(value) : value,
  }));
};


  const handleSubmitProduct = (e)=>{
    e.preventDefault();
    console.log(formData);
  }


  useEffect(()=>{
    const getProducts =async ()=>{

      const result = await axios.get("http://localhost:3000/api/products/get-products")

      console.log(result.data);
   setProducts(result.data);
    }

    getProducts();

  },[searchQuery])

  return (
    <Box
      p={3}
      sx={{
        height: "100vh",
        overflowY: "scroll",
 scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE/Edge
    '&::-webkit-scrollbar': {
      display: 'none', // Chrome, Safari, Edge
    },
      
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
                        InputLabelProps={{
    style: {
      color: isDark ? '#ccc' : '#555',  // Label text color
    },
  }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{color:isDark?"#fff":"#252525"}}/>
                </InputAdornment>
              ),sx: {
      color: isDark ? '#ccc' : '#555', // Label color
    },
  }}
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: isDark ? '#666' : '#ccc', // Border color
      },
      '&:hover fieldset': {
        borderColor: isDark ? '#888' : '#888',
      },
      '&.Mui-focused fieldset': {
        borderColor: isDark ? '#fff' : '#000',
      },
    },
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
             InputLabelProps={{
    style: {
      color: isDark ? '#ccc' : '#555',  // Label text color
    },
  }}
            sx={{ width: "150px" ,
            
      color: isDark ? '#fff' : '#222', // selected value text
      '.MuiSvgIcon-root': {
        color: isDark ? '#fff' : '#222', // dropdown arrow icon
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: isDark ? '#777' : '#ccc', // border
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: isDark ? '#aaa' : '#555',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: isDark ? '#fff' : '#000',
      },
    }}

     InputProps={{
    style: {
      color: isDark ? '#ccc' : '#555',  // Label text color
    },
  }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}  >
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
                        InputLabelProps={{
    style: {
      color: isDark ? '#ccc' : '#555',  // Label text color
    },
  }}
             InputProps={{
    style: {
      color: isDark ? '#ccc' : '#555',  // Label text color
    },
  }}
            sx={{ width: "150px" ,
            
      color: isDark ? '#fff' : '#222', // selected value text
      '.MuiSvgIcon-root': {
        color: isDark ? '#fff' : '#222', // dropdown arrow icon
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: isDark ? '#777' : '#ccc', // border
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: isDark ? '#aaa' : '#555',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: isDark ? '#fff' : '#000',
      },
    }}
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
            <ProductCard product={product} onDelete={handleDelete} isDark={isDark}/>
          </Grid>
        ))}
      </Grid>



      {/* /////////////////FORM DATA//////////////////////////////// */}






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
          <TextField label="Product Name" name="name" fullWidth onChange={handleFormChange} />
          <div style={{ display: "flex", gap: "16px" }}>
            <TextField
              label="Discount Price"
              name="discountPrice"
              fullWidth
              type="number"
              onChange={handleFormChange}
            />
            <TextField
              label="Original Price"
              name="originalPrice"
              fullWidth
              type="number"
              onChange={handleFormChange}
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
              onChange={handleFormChange}
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
              onChange={handleFormChange}
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
            onChange={handleFormChange}
          />
          <div style={{ display: "flex", gap: "16px" }}>
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              sx={{ width: "50%" }}
              onChange={handleFormChange}
            />

            <TextField
              label="Brand"
              name="brand"
              type="text"
              sx={{ width: "50%" }}
              onChange={handleFormChange}
            />
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            {/* <label htmlFor="" name="Sizes">Sizes</label> */}

            <TextField label="Small" name="small" type="number" onChange={handleFormChange}/>

            <TextField label="Medium" name="medium" type="number" onChange={handleFormChange}/>

            <TextField label="Large" name="large" type="number" onChange={handleFormChange}/>
            <TextField label="XL" name="extraLarge" type="number" onChange={handleFormChange}/>
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <TextField
              label="Volume(LTR for Liquid Products)"
              name="volume"
              type="number"
              sx={{ width: "50%" }}
              onChange={handleFormChange}
            />

            <TextField
              label="Weight in Grams"
              name="weight"
              type="number"
              sx={{ width: "50%" }}
              onChange={handleFormChange}
            />
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <TextField
              label="Rating"
              name="rating"
              type="number"
              inputProps={{ min: 0, max: 5, step: 0.1 }}
              sx={{ width: "50%" }}
              onChange={handleFormChange}
            />

            <TextField
              label="IsFeatured"
              name="isFeatured"
              sx={{ width: "50%" }}
              select
              onChange={handleFormChange}
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
              <input type="file" hidden accept="image/*" name="thumbnail" onChange={handleFormChange} />
            </Button>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mt: 2 }}
            >
              Upload Product Images
              <input type="file" hidden accept="image/*" multiple name="gallery" onChange={handleFormChange} />
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModal}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitProduct}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Product;
