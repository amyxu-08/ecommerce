import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const NavigationBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#222", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "left" }}>
          ECommerce
        </Typography>
        {isMobile ? (
          <IconButton color="inherit" aria-label="menu" edge="end" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        ) : (
          <div>
            <Button component={RouterLink} to="/" color="inherit" sx={{ mx: 1, textTransform: "none", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
              Home
            </Button>
            <Button component={RouterLink} to="/search" color="inherit" sx={{ mx: 1, textTransform: "none", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
              Buy From Us
            </Button>
            <Button component={RouterLink} to="/my-music" color="inherit" sx={{ mx: 1, textTransform: "none", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
              Buy From You
            </Button>
            <Button component={RouterLink} to="/profile" color="inherit" sx={{ mx: 1, textTransform: "none", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
              Profile
            </Button>
          </div>
        )}
      </Toolbar>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <List sx={{ width: 250 }} onClick={toggleDrawer}>
          <ListItem button component={RouterLink} to="/">
            <ListItemText primary="Discover" />
          </ListItem>
          <ListItem button component={RouterLink} to="/search">
            <ListItemText primary="Search" />
          </ListItem>
          <ListItem button component={RouterLink} to="/my-music">
            <ListItemText primary="My Music" />
          </ListItem>
          <ListItem button component={RouterLink} to="/profile">
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default NavigationBar;