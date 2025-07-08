import React, { useEffect, useState } from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import CategoryIcon from '@mui/icons-material/Category';
import { styled } from "@mui/system";
import {
Box,
Drawer,
List,
ListItem,
ListItemIcon,
ListItemText,
Avatar,
Typography,
IconButton,
Tooltip,
useMediaQuery,
Divider,
} from "@mui/material";
import { Link,useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/slice";


// Sidebar width constants
const SIDEBAR_WIDTH = 240;
const SIDEBAR_COLLAPSED_WIDTH = 72;

// Navigation links data
const navLinks = [
{ label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
{ label: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
{ label: "Products", icon: <InventoryIcon />, path: "/products" },
{ label: "Categories", icon: <CategoryIcon />, path: "/categories" },
{ label: "Customers", icon: <GroupIcon />, path: "/customers" },
{ label: "Orders", icon: <ShoppingCartIcon />, path: "/orders" },

{ label: "Logout", icon: <LogoutIcon />, path: "logout" },
];

// Glassmorphic styled Box
const GlassBox = styled(Box)(({ theme }) => ({
background: "rgba(255,255,255,0.12)",

backdropFilter: "blur(14px)",
border: "1px solid rgba(255,255,255,0.18)",
boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)",
borderRadius: "0px",
transition: "box-shadow 0.3s cubic-bezier(.4,0,.2,1), background 0.3s cubic-bezier(.4,0,.2,1)",
}));

// 3D hover effect
const NavItem = styled(ListItem)(({ theme }) => ({
borderRadius: 12,
margin: "4px 0",
transition: "transform 0.2s cubic-bezier(.4,0,.2,1), box-shadow 0.2s cubic-bezier(.4,0,.2,1)",
"&:hover": {
    transform: "translateY(-2px) scale(1.04)",
    boxShadow: "0 4px 16px 0 rgba(31,38,135,0.12)",
    background: "rgba(255,255,255,0.18)",
},
}));

const Sidebar = ({isDark}) => {
const [open, setOpen] = useState(true);
const isMobile = useMediaQuery("(max-width:900px)");
const dispatch = useDispatch();
const navigate = useNavigate();



// Responsive drawer variant
const drawerVariant = isMobile ? "temporary" : "permanent";

// Sidebar width
const width = open ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH;

const [menuActive,setMenuActive] = useState("/dashboard");
 const location = useLocation();


 const handleLogout = async(e)=>{
    let data = await axios.post("http://localhost:3000/api/admin/logout",{},{
        withCredentials:true
    })
    
    if(data.status == 200)
    {
      dispatch(logout());
      navigate("/")
     
      
    }
    else{
      dispatch(login());
    }
   

 }

useEffect(()=>{
   
    const currentPath = location.pathname;

    setMenuActive(currentPath);
},[location])

return (
    <Drawer
        variant={drawerVariant}
        open={open || !isMobile}
        onClose={() => setOpen(false)}
        PaperProps={{
            sx: {
                width,
                border: "none",
                background: "transparent",
                boxShadow: "none",
                transition: "width 0.4s cubic-bezier(.4,0,.2,1)",
                overflow: "visible",
                position:"relative",
                left:0,
               
            },
            elevation: 0,
        }}
        ModalProps={{
            keepMounted: true,
        }}
    >
        <GlassBox
            sx={{
                height: "100vh",
                width,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 2,
                px: open ? 2 : 1,
                transition: "width 0.4s cubic-bezier(.4,0,.2,1)",
                position: "relative",
                left: 0,
            }}
        >
            {/* Collapse/Expand Button */}
            <Box
                sx={{
                    alignSelf: open ? "flex-end" : "center",
                    mb: 2,
                    transition: "align-self 0.4s cubic-bezier(.4,0,.2,1)",
                }}
            >
                <Tooltip title={open ? "Collapse" : "Expand"}>
                    <IconButton
                        onClick={() => setOpen((prev) => !prev)}
                        size="large"
                        sx={{
                            color: "#222",
                            background:isDark?"#fff":"rgba(255,255,255,0.22)",
                            boxShadow: open
                                ? "0 2px 8px 0 rgba(31,38,135,0.10)"
                                : "0 1px 4px 0 rgba(31,38,135,0.08)",
                            border: "1px solid rgba(255,255,255,0.18)",
                            transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
                            "&:hover": {
                                background: "rgba(255,255,255,0.32)",
                            },
                        }}
                    >
                        {open ? <MenuOpenIcon /> : <MenuIcon />}
                    </IconButton>
                </Tooltip>
            </Box>

            {/* Profile Section */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: open ? "row" : "column",
                    alignItems: "center",
                    mb: 4,
                    width: "100%",
                    justifyContent: open ? "flex-start" : "center",
                    transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
                }}
            >
                <Avatar
                    src="https://i.pravatar.cc/100?img=12"
                    alt="Admin"
                    sx={{
                        width: 48,
                        height: 48,
                        boxShadow: "0 2px 8px 0 rgba(31,38,135,0.10)",
                        mr: open ? 2 : 0,
                        mb: open ? 0 : 1,
                        transition: "margin 0.4s cubic-bezier(.4,0,.2,1)",
                    }}
                />
                {open && (
                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        sx={{
                            color: isDark?"#fff":"#222",
                            whiteSpace: "nowrap",
                            transition: "opacity 0.4s cubic-bezier(.4,0,.2,1)",
                        }}
                    >
                        Admin Name
                    </Typography>
                )}
            </Box>

 <Divider           sx={{
    width: '100%',
    borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
    my: 2, // optional margin
  }}/>

            {/* Navigation Links */}
            <List sx={{ width: "100%", flex: 1 }}>
             {navLinks.map((item) => {
  const isLogout = item.path === "logout";

  return isLogout ? (
    <div
      key={item.label}
      onClick={handleLogout}
      style={{ textDecoration: "none", cursor: "pointer"}}
    >
      <Tooltip title={!open ? item.label : ""} placement="right" arrow>
        <NavItem button sx={{ px: open ? 2 : 1 }}>
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 2 : "auto",
              justifyContent: "center",
              color: "#d32f2f",
            }}
          >
            {item.icon}
          </ListItemIcon>
          {open && (
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: 500,
                sx: { color: "#d32f2f" },
              }}
            />
          )}
        </NavItem>
      </Tooltip>
    </div>
  ) : (
    <Link to={item.path} key={item.label} style={{ textDecoration: "none" }}>
      <Tooltip title={!open ? item.label : ""} placement="right" arrow>
        <NavItem button sx={{ px: open ? 2 : 1 }}>
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 2 : "auto",
              justifyContent: "center",
              color: menuActive === item.path ? "#1976d2" : isDark?"#fff":"#222",
            }}
          >
            {item.icon}
          </ListItemIcon>
          {open && (
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: 500,
                sx: {
                  color: menuActive === item.path ? "#1976d2" : isDark?"#fff":"#222",
                },
              }}
            />
          )}
        </NavItem>
      </Tooltip>
    </Link>
  );
})}

            </List>
        </GlassBox>
    </Drawer>
);
};

export default Sidebar;