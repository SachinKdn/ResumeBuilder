import React , {useState} from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import icon from '../DaanVeerIcon2.png'; // Adjust the path as necessary
import { useApi } from '../context/ApiContext';

{/* <Button onClick={()=>logout()}>Logout</Button> */}
const Header = () => {
    // const { logout } = useApi();
    type User = {
        role: 'USER' | 'ORGANIZATION';
        name?: string;
        email?: string;
        accessToken?: string;
        // Add other fields as needed
      };
    const [user, setUser] = useState<User | null>({
        role:"USER"
    });
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleLogout = () => {
    // Handle logout logic
    setUser(null);
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" className="company-logo" style={{ textDecoration: 'none' }}>
            <img src={icon} alt="company's logo" style={{ height: '40px' }} />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button component={Link} to="/" sx={{ my: 2, color: 'white', display: 'block' }}>Home</Button>
            
            {user && user.role === "USER" && (
              <>
                <Button component={Link} to="/donations" sx={{ my: 2, color: 'white', display: 'block' }}>Your Donations</Button>
                <Button component={Link} to="/organizations" sx={{ my: 2, color: 'white', display: 'block' }}>Organizations</Button>
                <Button component={Link} to="/profile" sx={{ my: 2, color: 'white', display: 'block' }}>My Profile</Button>
              </>
            )}

            {user && user.role === "ORGANIZATION" && (
              <>
                <Button component={Link} to="/requests" sx={{ my: 2, color: 'white', display: 'block' }}>Your Requests</Button>
                <Button component={Link} to="/allrequests" sx={{ my: 2, color: 'white', display: 'block' }}>Common Requests</Button>
                <Button component={Link} to="/orgDonations" sx={{ my: 2, color: 'white', display: 'block' }}>Active Donations</Button>
                <Button component={Link} to="/orgProfile" sx={{ my: 2, color: 'white', display: 'block' }}>Your Account</Button>
              </>
            )}

            {!user && (
              <>
                <Button component={Link} to="/login" sx={{ my: 2, color: 'white', display: 'block' }}>Log in</Button>
                <Button component={Link} to="/signup" sx={{ my: 2, color: 'white', display: 'block' }}>Sign up</Button>
              </>
            )}
            
            {user && (
              <Button onClick={handleLogout} sx={{ my: 2, color: 'white', display: 'block' }}>Log Out</Button>
            )}
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-label="menu" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">Home</MenuItem>
              {user && user.role === "USER" && (
                <>
                  <MenuItem onClick={handleCloseNavMenu} component={Link} to="/donations">Your Donations</MenuItem>
                  <MenuItem onClick={handleCloseNavMenu} component={Link} to="/organizations">Organizations</MenuItem>
                  <MenuItem onClick={handleCloseNavMenu} component={Link} to="/profile">My Profile</MenuItem>
                </>
              )}
              {user && user.role === "ORGANIZATION" && (
                <>
                  <MenuItem onClick={handleCloseNavMenu} component={Link} to="/requests">Your Requests</MenuItem>
                  <MenuItem onClick={handleCloseNavMenu} component={Link} to="/allrequests">Common Requests</MenuItem>
                  <MenuItem onClick={handleCloseNavMenu} component={Link} to="/orgDonations">Active Donations</MenuItem>
                  <MenuItem onClick={handleCloseNavMenu} component={Link} to="/orgProfile">Your Account</MenuItem>
                </>
              )}
              {!user && (
                <>
                  <MenuItem onClick={handleCloseNavMenu} component={Link} to="/login">Log in</MenuItem>
                  <MenuItem onClick={handleCloseNavMenu} component={Link} to="/signup">Sign up</MenuItem>
                </>
              )}
              {user && (
                <MenuItem onClick={handleLogout} component={Link} to="/">Log Out</MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header