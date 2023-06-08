const express = require('express');
const router = express.Router();
const db = require('../firebase');
const { collection, addDoc, doc, updateDoc, deleteDoc } = require('firebase/firestore');
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

router.put('/:id', async (req, res) => {
  // update an existing product in Firebase
  const productId = req.params.id;
  const updatedProductData = {
    quantity: req.body.quantity,
  };
  try {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, updatedProductData);
    res.status(200).send(`Product with ID ${productId} updated successfully`);
  } catch (error) {
    res.status(500).send(`Error updating product with ID ${productId}: ${error}`);
  }
});

router.delete('/:id', async (req, res) => {
  // delete an existing product in Firebase
  const productId = req.params.id;
  try {
    const productRef = doc(db, 'products', productId);
    await deleteDoc(productRef);
    res.status(200).send(`Product with ID ${productId} deleted successfully`);
  } catch (error) {
    res.status(500).send(`Error deleting product with ID ${productId}: ${error}`);
  }
});

module.exports = router;

