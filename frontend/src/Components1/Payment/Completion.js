import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";

function Completion() {

  const API_URL = "https://backend-ecommerce-f.onrender.com";
  const email = new URLSearchParams(useLocation().search).get('email');
  const name = new URLSearchParams(useLocation().search).get('name');

  useEffect(() => {
    const clearCartSendEmail = async () => {
      try {
        const response = await fetch(`${API_URL}/cart`);
        const { cartItems } = await response.json();

        // Get all products from the products collection
        const productsResponse = await fetch(`${API_URL}/public/items/all`);
        const products = await productsResponse.json();

        // Update the stock for each item in the cart
        for (const cartItem of cartItems) {
          const newStock = cartItem.stock - cartItem.quantity;

          const product = products.find(
            (product) => product.name === cartItem.title
          );

          if (product) {
            // Update the stock for the item in the products collection
            await fetch(`${API_URL}/items/${product.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ quantity: newStock }),
            });

            // Delete the product if its stock is 0
            if (newStock === 0) {
              await fetch(`${API_URL}/items/${product.id}`, {
                method: "DELETE",
              });
            }
          }
        }
      } catch (error) {
        console.error("Error updating products:", error);
      }

      try {
        const response = await fetch(`${API_URL}/cart`, {
          method: "DELETE",
        });
      } catch (error) {
        console.error("Error deleting item from cart:", error);
      }


      //Send email/* 
      emailjs.send("service_wc5r8pq", "template_nl7akfi", {
        to_name: name,
        to_email: email,
      }, '-SGgWrr1IV45PVLiv');
    }
    clearCartSendEmail();
  }, []);

  return (
    <>
      <Box height={100}></Box>
      <Typography variant="h3">Thank you! 🎉</Typography>
      <Typography variant="h6" m={2}>
        Come back soon!
      </Typography>
    </>
  );
}

export default Completion;
