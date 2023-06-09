import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Cart from "../Cart/Cart";
const NavigationBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
  const toggleCart = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setIsCartOpen(!isCartOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "#297F61", boxShadow: "none" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: "left" }}
        >
          Eco-commerce
        </Typography>
        {isMobile ? (
          <IconButton
            color="inherit"
            aria-label="menu"
            edge="end"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <div>
            <Button
              component={RouterLink}
              to="/"
              color="inherit"
              sx={{
                mx: 1,
                textTransform: "none",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Home
            </Button>
            <Button
              component={RouterLink}
              to="/buyFromUs"
              color="inherit"
              sx={{
                mx: 1,
                textTransform: "none",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Buy From Us
            </Button>
            <Button
              component={RouterLink}
              to="/buy-from-you"
              color="inherit"
              sx={{
                mx: 1,
                textTransform: "none",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Buy From You
            </Button>
            <Cart toggleCart={toggleCart}></Cart>
          </div>
        )}
      </Toolbar>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <List sx={{ width: 250 }} onClick={toggleDrawer}>
          <ListItem button component={RouterLink} to="/">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={RouterLink} to="/buyFromUs">
            <ListItemText primary="Buy From Us" />
          </ListItem>
          <ListItem button component={RouterLink} to="/my-music">
            <ListItemText primary="By From You" />
          </ListItem>
        </List>
        <div>
          <ListItem button component={RouterLink}>
            <Cart toggleCart={toggleCart} />
          </ListItem>
        </div>
      </Drawer>
    </AppBar>
  );
};

export default NavigationBar;
