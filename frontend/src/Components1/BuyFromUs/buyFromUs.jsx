import axios from "axios";
import {
  CssBaseline,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";

function BuyFromUs() {
  const API_URL = "http://localhost:9000";

  const [categoryData, setCategoryData] = useState([]);

  const fetchData = async (category) => {
    try {
      const response = await fetch(`${API_URL}/buyFromUs/${category}`);
      const data = await response.json();
      console.log(data);

      // Update the categoryData state with the fetched data
      setCategoryData((prevData) => [...prevData, data.categoryData.products]);
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
    // Fetch data for each category
    categories.forEach((category) => {
      fetchData(category);
    });
  }, []);

  // Render your component JSX using the categoryData state
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {categoryData.map((products, index) => (
            <React.Fragment key={index}>
              {products.map((data) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={data.id}>
                  <Card style={{ height: "100%" }}>
                    <CardMedia
                      style={{ paddingTop: "56.35%" }}
                      image={data.thumbnail}
                      title={data.title}
                    />
                    <CardContent style={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="div" gutterBottom>
                        {data.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Description: {data.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </React.Fragment>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default BuyFromUs;
