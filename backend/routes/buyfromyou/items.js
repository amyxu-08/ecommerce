const express = require('express');
const router = express.Router();
const db = require('../firebase');
const { collection, addDoc } = require('firebase/firestore');
console.log('items.js loaded')

router.post('/', async (req, res) => {
  // create a new product in Firebase
  const newProductData = {
    image: req.body.image,
    name: req.body.name,
    user: req.body.user,
    price: req.body.price,
    quantity: req.body.quantity,
    email: req.body.email
  };
  try {
    const docRef = await addDoc(collection(db, 'products'), newProductData);
    res.status(201).send(`Product created with ID: ${docRef.id}`);
  } catch (error) {
    res.status(500).send(`Error creating product: ${error}`);
  }
});

module.exports = router;
