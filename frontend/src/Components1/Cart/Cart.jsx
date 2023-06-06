import { Modal, Box, Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

function Cart() {
  const API_URL = "http://localhost:9000";

  const [cartData, setcartData] = useState({});
  const [open, setOpen] = React.useState(false);

  const fetchData = async (category) => {
    try {
      const response = await fetch(`${API_URL}/cart`);
      const data = await response.json();
      setcartData(data.cartItems);
    } catch (error) {
      console.error("Error retrieving category data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            width: "400px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Your Cart
          </Typography>
          {Object.values(cartData).map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <Typography variant="body1" style={{ textAlign: "right" }}>
                {item.title}
              </Typography>
              <Typography variant="body1" style={{ textAlign: "left" }}>
                {item.price} $
              </Typography>
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
              {Object.values(cartData).reduce(
                (total, item) => total + item.price,
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
