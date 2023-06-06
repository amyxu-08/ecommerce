const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const response = await axios.get(
      `https://dummyjson.com/products/category/${category}`
    );
    const categoryData = response.data;
    res.json({ categoryData });
  } catch (error) {
    console.error("Error retrieving category data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving category data" });
  }
});

module.exports = router;
