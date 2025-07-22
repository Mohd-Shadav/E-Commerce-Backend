import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CategoryCard from "./CategoryCard";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductCard from "../Products/ProductCard";
import { set } from "mongoose";

function Categories({ isDark }) {
  const [selectData, setSelectData] = useState("All");
  const [categories, setCategories] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteItem, setIsDeleteItem] = useState(false);
  const [subCatCount, setSubCatCount] = useState(0);
  const [productByCategory, setProductsByCategory] = useState([]);
  const [callProducts, setCallProducts] = useState(false);
  const [categoryData, setCategoryData] = useState({
    categoryname: "",
    subcategories:[],
    categoryicon: "",
  });

  const [filterData, setFilterData] = useState([]);

  const handleSelectChange = (e) => {
    setSelectData(e.target.value);

    if (e.target.value === "All") {
      setFilterData(categories);
    } else {
      const filterizedData = categories.filter(
        (item) => item.categoryname === e.target.value
      );

      setFilterData(filterizedData);
    }
  };

  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleChange = (e) => {
    let { name, value, files } = e.target;

    if (name === "categoryicon") {
      const file = files[0];

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setCategoryData((prev) => ({
            ...prev,
            categoryicon: reader.result,
          }));
        };

        reader.readAsDataURL(file);
      }
      return;
    }

    if(name.startsWith("subcategoryname")){

      const index = parseInt(name.replace("subcategoryname",""),10);

      const updatedSubCategories = [...categoryData.subcategories];

      updatedSubCategories[index] = value;
          setCategoryData((prev) => ({
      ...prev,
      subcategories:updatedSubCategories
    }));

    return;
    }

    setCategoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      let data = await axios.post(
        "http://localhost:3000/api/category/create-category",
        categoryData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Category Added Successfully...");
      setIsDialogOpen(false);
      setCategoryData({ categoryname: "",subcategories:[], categoryicon: "" });
    } catch (err) {
      console.log("Something Went Wrong...");
    }
  };

const handleDeleteSubcategory = (idx) => {
  setCategoryData((prev) => {
    const updatedSubcategories = [...prev.subcategories];
    updatedSubcategories.splice(idx, 1); // remove by index
    return {
      ...prev,
      subcategories: updatedSubcategories,
    };
  });

  // This ensures the deleted field disappears visually
  setSubCatCount((prev) => Math.max(prev - 1, 0));
};


  const handleDelete = async (id) => {
    try {
      let res = await axios.delete(
        "http://localhost:3000/api/products/delete-product",
        {
          data: { _id: id },
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      alert("Product Deleted Successfully");
      setCallProducts(!callProducts);
    } catch (err) {
      alert("Something Went Wrong");
    }
  };

  const sendCategory = async (name) => {
   

    try {
      let res = await axios.get(
        `http://localhost:3000/api/products/category/${encodeURIComponent(
          name
        )}`
      );

      
      setProductsByCategory(res.data);
    } catch (err) {
      alert("Semething went wrong...");
    }
  };

  const resetProductByCategory = () => {
    setProductsByCategory([]);
  };

  const handleSubCatCount = () => {
    setSubCatCount((prev) => prev + 1);
  };

  useEffect(() => {
    const renderCategory = async () => {
      try {
        let res = await axios.get(
          "http://localhost:3000/api/category/get-categories"
        );

        setCategories(res.data);
        setFilterData(res.data);
      } catch (err) {
        alert("Data was not fetched....");
      }
    };

    renderCategory();
  }, [isDialogOpen, isDeleteItem]);

  return (
    <Box style={{ width: "100%" }}>
      <Container>
        <Typography variant="h4" marginY={3} fontWeight={700} gutterBottom>
          Categories
        </Typography>

        <div
          className=""
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <TextField
            select
            onChange={handleSelectChange}
            value={selectData}
            label={"Select an Option"}
            InputLabelProps={{
              style: {
                color: isDark ? "#ccc" : "#555", // Label text color
              },
            }}
            sx={{
              width: "150px",

              color: isDark ? "#fff" : "#222", // selected value text
              ".MuiSvgIcon-root": {
                color: isDark ? "#fff" : "#222", // dropdown arrow icon
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: isDark ? "#777" : "#ccc", // border
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: isDark ? "#aaa" : "#555",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: isDark ? "#fff" : "#000",
              },
            }}
            InputProps={{
              style: {
                color: isDark ? "#ccc" : "#555", // Label text color
              },
            }}
          >
            <MenuItem value="All">All</MenuItem>
            {categories.map((item) => {
              return (
                <MenuItem value={item.categoryname}>
                  {item.categoryname}
                </MenuItem>
              );
            })}
          </TextField>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleDialog}
            sx={{ p: 2 }}
          >
            Add Category
          </Button>
        </div>

        <div
          className=""
          style={{
            marginTop: "3rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {productByCategory.length <= 0 ? (
            filterData.map((item) => {
              return (
                <CategoryCard
                  id={item._id}
                  name={item.categoryname}
                  subcategories={item.subcategories}
                  icon={item.categoryicon}
                  setIsDeleteItem={setIsDeleteItem}
                  isDark={isDark}
                  onClick={() => sendCategory(item.categoryname)}
                />
              );
            })
          ) : (
            <div className="">
              <div
                className=""
                style={{ display: "flex", gap: "2rem", alignItems: "center" }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={resetProductByCategory}
                >
                  Back
                </Button>
                <Typography variant="h6">
                  Total Products in this Category : {productByCategory.length}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "2rem",
                  flexWrap: "wrap",
                  marginTop: "2rem",
                }}
              >
                {productByCategory.map((item) => {
                  return (
                    <ProductCard
                      product={item}
                      isDark={isDark}
                      onDelete={handleDelete}
                      setCallProducts={setCallProducts}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* open dialog to add category */}

        <Dialog onClose={handleDialog} open={isDialogOpen}>
          <DialogTitle>Add Category</DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="Category Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={categoryData.categoryname}
                name="categoryname"
                onChange={handleChange}
              />
              {Array.from({ length: subCatCount }).map((item, idx) => {
                return (
                  <div style={{ display: "flex",justifyContent:"center",alignItems:"center" ,gap:"10px"}}>
                    <TextField
                      label="Sub Category Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={categoryData?.subcategories[idx] || ""}
                      name={`subcategoryname${idx}`}
                      onChange={handleChange}
                    />

                 <Tooltip title="Delete">
  <Button color="error" sx={{ height: "100%", py: "5px" }} onClick={()=>handleDeleteSubcategory(idx)}>
    <DeleteIcon color="error"  />
  </Button>
</Tooltip>
                  </div>
                );
              })}

              <Button
                variant="contained"
                color="success"
                component="label"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleSubCatCount}
              >
                Add Sub-Category
              </Button>

              <Button
                variant="contained"
                
                component="label"
                fullWidth
                sx={{ mt: 2 }}
              >
                Upload Thumbnail Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  name="categoryicon"
                  onChange={handleChange}
                />
              </Button>

              <Button
                variant="contained"
                type="submit"
                sx={{ marginTop: "2rem" }}
              >
                Submit
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}

export default Categories;
