const express = require("express");
const router = express.Router();
const db = require("./firebase");

const { collection, doc, setDoc, getDocs } = require("firebase/firestore");

router.post("/", async (req, res) => {
  try {
    const { title, price, rating } = req.body;

    // Add the cart item to the cart collection in your Firebase Firestore
    const cartRef = doc(collection(db, "cart"));
    await setDoc(cartRef, { title, price, rating });

    res.json({ success: true, message: "Item added to cart successfully!" });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add item to cart" });
  }
});

router.get("/", async (req, res) => {
  try {
    // Retrieve the cart items from the "cart" collection
    const cartRef = collection(db, "cart");
    const querySnapshot = await getDocs(cartRef);

    const cartItems = [];
    querySnapshot.forEach((doc) => {
      const cartItem = doc.data();
      cartItem.id = doc.id;
      cartItems.push(cartItem);
    });

    // Return the cart items as a response
    res.json({ success: true, cartItems });
  } catch (error) {
    console.error("Error retrieving cart items:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve cart items." });
  }
});

module.exports = router;
