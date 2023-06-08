import {
  ButtonGroup,
  Modal,
  Drawer,
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
function Cart() {
  const API_URL = "https://backend-ecommerce-f.onrender.com";

  const [cartData, setcartData] = useState({});
  const [open, setOpen] = React.useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/cart`);
      const data = await response.json();
      setcartData(data.cartItems);
      setTotalPrice(
        Object.values(data.cartItems).reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      );
    } catch (error) {
      console.error("Error retrieving cart data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(`${API_URL}/cart/${itemId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchData();
      } else {
        console.error("Failed to delete item from cart.");
      }
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };
  const handleIncreaseQuantity = async (itemId) => {
    try {
      const response = await fetch(`${API_URL}/cart/${itemId}/increase`, {
        method: "PUT",
      });

      if (response.ok) {
        fetchData();
      } else if (response.status === 400) {
        setSnackbarOpen(true);
      } else {
        console.error("Failed to increase item quantity in cart.");
      }
    } catch (error) {
      console.error("Error increasing item quantity in cart:", error);
    }
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Button
        component={RouterLink}
        color="inherit"
        sx={{
          mx: 1,
          textTransform: "none",
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
        }}
        onClick={handleOpen}
      >
        Cart
      </Button>

      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Box
          sx={{
            width: "425px",
            bgcolor: "background.paper",
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Your Cart
          </Typography>
          {Object.keys(cartData).length === 0 ? (
            <Typography variant="body2" style={{ textAlign: "left" }}>
              Your cart is empty, let's start shopping!
            </Typography>
          ) : (
            <>
              {Object.values(cartData).map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    flexDirection: "column", // Change the flex direction to column
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      variant="body1"
                      style={{
                        flex: 1,
                        textAlign: "left",
                        marginBottom: "10px",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body1" style={{ textAlign: "right" }}>
                      $ {item.price * item.quantity}
                    </Typography>
                  </div>
                  <ButtonGroup
                    size="small"
                    aria-label="small outlined button group"
                  >
                    <Button onClick={() => handleDeleteItem(item.id)}>-</Button>
                    <Button disabled>{item.quantity}</Button>
                    <Button onClick={() => handleIncreaseQuantity(item.id)}>
                      +
                    </Button>
                  </ButtonGroup>
                </div>
              ))}
              <hr />
              <Typography
                variant="body1"
                gutterBottom
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Total Price:</span>
                <span>
                  ${" "}
                  {Object.values(cartData).reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}{" "}
                </span>
              </Typography>
              <Button component={RouterLink} to={`/payment/${totalPrice}`}>
                Go to Checkout
              </Button>{" "}
            </>
          )}
          <Snackbar
            open={snackbarOpen}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            autoHideDuration={1500}
            onClose={handleSnackbarClose}
          >
            <Alert severity="error">Maximum stock reached</Alert>
          </Snackbar>
        </Box>
      </Drawer>
    </>
  );
}

export default Cart;
