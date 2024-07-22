import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import icon from "../ResumeBuilderIcon.png"; // Adjust the path as necessary
import { useApi } from "../context/ApiContext";

{
  /* <Button onClick={()=>logout()}>Logout</Button> */
}
const Header = () => {
  const { user, logout } = useApi();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleLogout = () => {
    // Handle logout logic
    logout();
  };
  return (
    <Container
      maxWidth="xl"
      sx={{
        // border: "1px solid red",
        boxShadow: "-1px -1px 20px 0px #9E9E9E",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link to="/" className="company-logo" style={{ textDecoration: "none" }}>
        <img src={icon} alt="company's logo" style={{ height: "40px" }} />
      </Link>

      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
          justifyContent: "flex-end",
        }}
      >
        <Button
          component={Link}
          to="/"
          sx={{ color: "black", display: "block" }}
        >
          Home
        </Button>
        {/* <Button
        component={Link}
        to="/orgProfile"
        sx={{ my: 2, color: "white", display: "block" }}
      >
        Your Account
      </Button> */}

        {!user && (
          <>
            <Button
              component={Link}
              to="/login"
              sx={{ color: "black", display: "block" }}
            >
              Log in
            </Button>
            <Button
              component={Link}
              to="/signup"
              sx={{ color: "black", display: "block" }}
            >
              Sign up
            </Button>
          </>
        )}

        {user && (
          <Button
            onClick={handleLogout}
            sx={{ color: "red", display: "block" }}
          >
            Log Out
          </Button>
        )}
      </Box>

      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
        >
          <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
            Home
          </MenuItem>

          {!user && (
            <>
              <MenuItem
                onClick={handleCloseNavMenu}
                component={Link}
                to="/login"
              >
                Log in
              </MenuItem>
              <MenuItem
                onClick={handleCloseNavMenu}
                component={Link}
                to="/signup"
              >
                Sign up
              </MenuItem>
            </>
          )}
          {user && (
            <MenuItem onClick={handleLogout} component={Link} to="/">
              Log Out
            </MenuItem>
          )}
        </Menu>
      </Box>
    </Container>
  );
};

export default Header;
