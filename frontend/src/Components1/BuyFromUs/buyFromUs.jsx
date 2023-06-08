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
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpenForStock, setSnackbarOpenForStock] = useState(false);

  const fetchData = async (category) => {
    try {
      const response = await fetch(`${API_URL}/buyFromUs/${category}`);
      const data = await response.json();

      setCategoryData((prevData) => ({
        ...prevData,
        [category]: data.categoryData.products,
      }));
    } catch (error) {
      console.error("Error retrieving category data:", error);
    }
  };

  const categories = [
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
        category.toLowerCase().includes("womens") || category === "sunglasses"
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleAddToCart = (data) => {
    const cartItem = {
      title: data.title,
      price: data.price,
      rating: data.rating,
    };

    axios
      .post(`${API_URL}/cart`, cartItem)
      .then((response) => {
        console.log(response.data);
        handleSnackbarOpen("Item added to cart successfully!");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setSnackbarOpenForStock(true);
        } else {
          console.error("Error adding item to cart:", error);
        }
      });
  };

  const filteredProducts = (category) => {
    return (
      categoryData[category] &&
      categoryData[category].filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };
  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpenForStock(false);
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
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
          margin="normal"
        />

        {categories.map((category) => (
          <React.Fragment key={category}>
            {filterByCategory(category) && (
              <>
                {filteredProducts(category)?.length > 0 && (
                  <>
                    <br />
                    <Typography variant="h5" component="h2" gutterBottom>
                      {formatTitle(category)}
                    </Typography>
                    <Grid container spacing={4}>
                      {filteredProducts(category)
                        ?.slice(0, 4)
                        .map((data) => (
                          <Grid item xs={12} sm={6} md={3} lg={3} key={data.id}>
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
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  ${data.price} | {data.rating} ★
                                </Typography>
                                <br />
                              </CardContent>
                              <div
                                style={{ padding: "8px", marginTop: "auto" }}
                              >
                                <Button
                                  onClick={() => handleAddToCart(data)}
                                  variant="contained"
                                  color="primary"
                                >
                                  Add to Cart
                                </Button>
                              </div>
                              <Snackbar
                                open={snackbarOpen}
                                anchorOrigin={{
                                  vertical: "top",
                                  horizontal: "center",
                                }}
                                autoHideDuration={1500}
                                onClose={() => setSnackbarOpen(false)}
                              >
                                <MuiAlert
                                  variant="filled"
                                  onClose={() => setSnackbarOpen(false)}
                                  severity="info"
                                >
                                  {snackbarMessage}
                                </MuiAlert>
                              </Snackbar>
                            </Card>
                          </Grid>
                        ))}
                    </Grid>
                  </>
                )}
              </>
            )}
          </React.Fragment>
        ))}
        <Snackbar
          open={snackbarOpenForStock}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          autoHideDuration={1000}
          onClose={handleSnackbarClose}
        >
          <Alert severity="error">Maximum stock reached</Alert>
        </Snackbar>
      </Container>
    </>
  );
}

export default BuyFromUs;
