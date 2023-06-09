import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { Container } from "@mui/system";
import { Grid, TextField, Typography } from "@mui/material";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { totalPrice } = useParams();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const API_URL = "https://backend-ecommerce-f.onrender.com";

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsProcessing(true);

    const parameters = new URLSearchParams();
    parameters.append("name", document.getElementById("checkout-name").value);
    parameters.append("email", document.getElementById("checkout-email").value);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${
          window.location.origin
        }/completion?${parameters.toString()}`,
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
      <form id="payment-form" onSubmit={handleSubmit}>
        <Typography m={3} variant="h6">
          Total Price: <strong>$ {totalPrice}</strong>
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="checkout-name"
              label="Full name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField required id="checkout-email" label="Email" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required id="city" label="City" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="state"
              label="State/Province/Region"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required id="zip" label="Zip / Postal code" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required id="country" label="Country" fullWidth />
          </Grid>
        </Grid>
        <hr></hr>
        <PaymentElement id="payment-element" />
        <button
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
