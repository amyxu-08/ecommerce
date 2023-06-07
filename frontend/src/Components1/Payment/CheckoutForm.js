import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import axios from "axios";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { totalPrice } = useParams();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  /*const handleSubmit = (e) => {
    e.preventDefault();
    alert("submitted");
  };*/
  const handleButtonClick = async () => {
    const API_URL = "http://localhost:9000";
    try {
      const response = await fetch(`${API_URL}/cart`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    //alert("Submitted!");

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion/`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography m={3} variant="h6">
        Total Price: <strong>$ {totalPrice}</strong>
      </Typography>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <button
          onClick={handleButtonClick}
          disabled={isProcessing || !stripe || !elements}
          id="submit"
          style={{
            marginTop: "15px",
            marginBottom: "15px",
            backgroundColor: "#297F61",
            color: "white",
            boxShadow: "none",
            padding: "10px 20px",
            fontSize: "18px",
          }}
        >
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </Container>
  );
}
