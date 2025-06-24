import React, { useState } from "react";
import {
  Typography,
  Avatar,
  Button,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  Divider,
} from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuthStore } from "../../stores/auth/authStore"; // Adjust the import path as needed
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

const Header = ({ theme }) => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const { getUser, logout } = useAuthStore(); // Import the logout function from the auth store
  const user = getUser();

  // Profile menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        px: { xs: 2, sm: 4 },
        py: { xs: 2, sm: 2 },
        ml: { xs: 0, sm: "10px" },
        borderBottomLeftRadius: "10px",
        borderTopLeftRadius: "0px",
        gap: 0,
        border: "1px solid red",
      }}
    >
      <Typography
        variant={isMobile ? "h5" : "h3"}
        fontWeight="bold"
        sx={{
          color: theme.palette.text.primary,
          textShadow: "0 2px 8px rgba(0,0,0,0.08)",
          letterSpacing: 1,
          mb: 0,
          ml: { xs: 0, sm: 2 },
          flex: 1,
          textAlign: "left", // Ensure left alignment
        }}
      >
        {isMobile ? "Hi, " : "Welcome back, "}
        <span style={{ color: theme.palette.primary.main }}>
          {user.firstName}
        </span>{" "}
        👋
      </Typography>

      <IconButton color="primary" onClick={handleProfileClick} sx={{ ml: 1 }}>
        <AccountCircleIcon sx={{ fontSize: 50 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleProfileClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={handleProfileClose}
          sx={{
            fontSize: "1.05rem",
            py: 1,
            justifyContent: "left",
            textAlign: "center",
            gap: 1,
            pr: 10,
          }}
        >
          <SettingsIcon sx={{ fontSize: 22, mr: 1 }} />
          Settings
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleProfileClose();
            logout(); // Call the logout function from the auth store
          }}
          sx={{
            fontSize: "1.15rem",
            py: 1,
            justifyContent: "left",
            textAlign: "center",
            gap: 1,
            pr: 10,
            color: "error.main",
          }}
        >
          <LogoutIcon sx={{ fontSize: 22, mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default Header;
