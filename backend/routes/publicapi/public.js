const express = require('express');
const router = express.Router();
const db = require('../firebase');
const { collection, doc, getDocs , getDoc } = require('firebase/firestore');
console.log('public.js loaded')
router.get('/items/all', async (req, res) => {
  // retrieve list of available products from Firebase
  const productsRef = collection(db, 'products');
  const snapshot = await getDocs(productsRef);
  const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(products);
});


router.get('/item/:id', async (req, res) => {
  const itemId = req.params.id;
  // retrieve item details for itemId from Firebase
  const itemRef = doc(db, 'products', itemId);
  const docSnap = await getDoc(itemRef);
  if (!docSnap.exists()) {
    res.status(404).send('Item not found');
  } else {
    res.json(docSnap.data());
  }
});

module.exports = router;
