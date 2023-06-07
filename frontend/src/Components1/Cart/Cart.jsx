import { Modal, Box, Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
function Cart() {
  const API_URL = "http://localhost:9000";

  const [cartData, setcartData] = useState({});
  const [open, setOpen] = React.useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/cart`);
      const data = await response.json();
      setcartData(data.cartItems);
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
        // Refresh cart data after successful deletion
        fetchData();
      } else {
        console.error("Failed to delete item from cart.");
      }
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
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

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            transform: "translateY(-50%)",
            width: "500px",
            bgcolor: "background.paper",
            boxShadow: 24,
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
            Object.values(cartData).map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <RemoveCircleOutlineIcon
                  style={{
                    textAlign: "left",
                    marginRight: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDeleteItem(item.id)}
                />
                <Typography
                  variant="body1"
                  style={{ flex: 1, textAlign: "left" }}
                >
                  {item.title} x {item.quantity}
                </Typography>
                <Typography variant="body1" style={{ textAlign: "right" }}>
                  {item.price * item.quantity} $
                </Typography>
              </div>
            ))
          )}

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
              {Object.values(cartData).reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}{" "}
              $
            </span>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default Cart;
