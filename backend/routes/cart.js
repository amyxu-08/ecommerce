const express = require("express");
const router = express.Router();
const db = require("./firebase");

const {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  updateDoc,
  where,
  getDoc,
  deleteDoc,
} = require("firebase/firestore");

router.post("/", async (req, res) => {
  try {
    const { title, price, rating, stock } = req.body;

    // Check if the item already exists in the cart
    const cartQuery = query(
      collection(db, "cart"),
      where("title", "==", title)
    );
    const cartSnapshot = await getDocs(cartQuery);
    const cartDocs = cartSnapshot.docs;

    if (cartDocs.length > 0) {
      // Item already exists, increment the quantity by 1
      const cartItemRef = doc(db, "cart", cartDocs[0].id);
      const cartItemDoc = await getDoc(cartItemRef);
      const currentQuantity = cartItemDoc.data().quantity;
      await updateDoc(cartItemRef, { quantity: currentQuantity + 1 });
    } else {
      // Item doesn't exist, add it to the cart with quantity 1
      const cartRef = doc(collection(db, "cart"));
      await setDoc(cartRef, { title, price, rating: rating || null, quantity: 1, stock: stock || 999 });
    }

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
router.delete("/:id", async (req, res) => {
  try {
    const cartItemId = req.params.id;

    const cartItemRef = doc(db, "cart", cartItemId);
    const cartItemDoc = await getDoc(cartItemRef);

    if (cartItemDoc.exists()) {
      const currentQuantity = cartItemDoc.data().quantity;

      if (currentQuantity > 1) {
        // Decrease the quantity by 1 if it's greater than 1
        await updateDoc(cartItemRef, { quantity: currentQuantity - 1 });
      } else {
        // Remove the cart item if the quantity is 1
        await deleteDoc(cartItemRef);
      }

      res.json({ success: true, message: "Cart item removed successfully!" });
    } else {
      res.status(404).json({ success: false, message: "Cart item not found." });
    }
  } catch (error) {
    console.error("Error removing cart item:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to remove cart item." });
  }
});

router.put("/:id/increase", async (req, res) => {
  try {
    const cartItemId = req.params.id;

    const cartItemRef = doc(db, "cart", cartItemId);
    const cartItemDoc = await getDoc(cartItemRef);

    if (cartItemDoc.exists()) {
      const currentQuantity = cartItemDoc.data().quantity;
      const currentStock = cartItemDoc.data().stock;

      if (currentQuantity < currentStock) {
        await updateDoc(cartItemRef, { quantity: currentQuantity + 1 });
        res.json({
          success: true,
          message: "Cart item quantity increased successfully!",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Can't increase quantity beyond available stock.",
        });
      }
    } else {
      res.status(404).json({ success: false, message: "Cart item not found." });
    }
  } catch (error) {
    console.error("Error increasing cart item quantity:", error);
    res.status(500).json({
      success: false,
      message: "Failed to increase cart item quantity.",
    });
  }
});

module.exports = router;
