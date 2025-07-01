import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Badge,
  IconButton,
  Avatar,
  Tooltip,
  Switch,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const TopBar = ({
  open,
  title,
  onToggleMode,
  mode = "light",
  avatarUrl = "https://i.pravatar.cc/300?img=1",
  onAvatarClick,
}) => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: 0,
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.18)",
        boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)",
        color: "#222",
        height: 64,
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        marginLeft: open ? "240px" : "72px",
        width: "100%",
        px: 3,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          width: "100%",
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Center Heading */}
        <Typography
          variant="h6"
          noWrap
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontWeight: 600,
            letterSpacing: 0.5,
            color: "#222",
            textShadow: "0 1px 2px rgba(255,255,255,0.2)",
          }}
        >
          {title}
        </Typography>

        {/* Right Side Icons */}
        <Box
          sx={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <IconButton sx={{ color: "#222" }}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Switch
            checked={mode === "dark"}
            onChange={onToggleMode}
            color="default"
            inputProps={{ "aria-label": "toggle theme" }}
            sx={{
              "& .MuiSwitch-thumb": {
                backgroundColor: mode === "dark" ? "#222" : "#fff",
                transition: "background-color 0.4s",
              },
            }}
          />

          <Tooltip title="Admin Profile" arrow>
            <IconButton onClick={onAvatarClick} sx={{ p: 0 }}>
              <Avatar
                alt="Admin"
                src={avatarUrl}
                sx={{
                  width: 36,
                  height: 36,
                  border: "2px solid rgba(255,255,255,0.5)",
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onToggleMode: PropTypes.func,
  mode: PropTypes.oneOf(["light", "dark"]),
  avatarUrl: PropTypes.string,
  onAvatarClick: PropTypes.func,
};

export default TopBar;
