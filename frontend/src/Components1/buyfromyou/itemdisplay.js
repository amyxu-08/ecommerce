import { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Grid, Typography, Button } from '@mui/material';
import axios from 'axios';

const ItemDisplay = () => {
  const [items, setItems] = useState([]);
  const API_URL = 'http://localhost:9000';

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(`${API_URL}/public/items/all`);
      const data = await response.json();
      setItems(data);
    };
    fetchItems();
  }, []);

  const handleAddToCart = (data) => {
    const cartItem = {
      title: data.name,
      price: data.price,
    };

    axios
      .post(`${API_URL}/cart`, cartItem)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error);
      });
  };

  return (
    <div style={{ marginTop: '104px' }}>
      <h1>Available Items</h1>
      <Grid container spacing={4} sx={{ margin: '0 auto', maxWidth: '63%' }}>
        {items.map(item => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.name}>
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia style={{ paddingTop: '56.35%' }} image={item.image} title={item.name} />
              <CardContent style={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" gutterBottom>{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">Price: ${item.price}</Typography>
                <Typography variant="body2" color="textSecondary">Seller: {item.user}</Typography>
                <Typography variant="body2" color="textSecondary">Email: {item.email}</Typography>
              </CardContent>
              <div style={{ padding: '8px', marginTop: 'auto' }}>
                <Button variant="contained" color="primary" onClick={() => handleAddToCart(item)}>Add to Cart</Button>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ItemDisplay;
