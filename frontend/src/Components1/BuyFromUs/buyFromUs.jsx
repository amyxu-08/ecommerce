import axios from "axios";
import {
  CssBaseline,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import React, { useState, useEffect } from "react";

function formatTitle(category) {
  const words = category.split("-");
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function BuyFromUs() {
  const API_URL = "http://localhost:9000";

  const [categoryData, setCategoryData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("all");

  const fetchData = async (category) => {
    try {
      const response = await fetch(`${API_URL}/buyFromUs/${category}`);
      const data = await response.json();
      console.log(data);

      setCategoryData((prevData) => ({
        ...prevData,
        [category]: data.categoryData.products,
      }));
    } catch (error) {
      console.error("Error retrieving category data:", error);
    }
  };

  const categories = [
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
  ];

  useEffect(() => {
    const fetchDataForCategories = async () => {
      const promises = categories.map((category) => fetchData(category));

      try {
        await Promise.all(promises);
      } catch (error) {
        console.error("Error retrieving category data:", error);
      }
    };

    fetchDataForCategories();
  }, []);

  const filterByCategory = (category) => {
    if (selectedCategory === "all") {
      return true;
    } else if (selectedCategory === "womens") {
      return (
        category.toLowerCase().includes("womens") ||
        category === "sunglasses" ||
        category === "tops"
      );
    } else if (selectedCategory === "mens") {
      return (
        category.toLowerCase().startsWith("mens-") || category === "sunglasses"
      );
    }
  };

  const handleCategoryChange = (event, newCategory) => {
    setSelectedCategory(newCategory);
  };

  return (
    <>
      <CssBaseline />
      <br />
      <br />
      <br />
      <Container maxWidth="lg">
        <Tabs
          value={selectedCategory}
          onChange={handleCategoryChange}
          variant="fullWidth"
        >
          <Tab value="all" label="All" />
          <Tab value="womens" label="Womens" />
          <Tab value="mens" label="Mens" />
        </Tabs>

        {categories.map((category) => (
          <React.Fragment key={category}>
            {filterByCategory(category) && (
              <>
                <br />
                <Typography variant="h5" component="h2" gutterBottom>
                  {formatTitle(category)}
                </Typography>
                <Grid container spacing={4}>
                  {categoryData[category] &&
                    categoryData[category].slice(0, 4).map((data) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={data.id}>
                        <Card
                          style={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <CardMedia
                            style={{ paddingTop: "56.35%" }}
                            image={data.thumbnail}
                            title={data.title}
                          />
                          <CardContent style={{ flexGrow: 1 }}>
                            <Typography
                              variant="h6"
                              component="div"
                              gutterBottom
                            >
                              {data.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Price: {data.price}$ | Rating: {data.rating} ★{" "}
                            </Typography>
                            <br />
                          </CardContent>
                          <div style={{ padding: "8px", marginTop: "auto" }}>
                            <Button variant="contained" color="primary">
                              Add to Cart
                            </Button>
                          </div>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
              </>
            )}
          </React.Fragment>
        ))}
      </Container>
    </>
  );
}

export default BuyFromUs;
