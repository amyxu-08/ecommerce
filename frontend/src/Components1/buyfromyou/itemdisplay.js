import { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Grid, Typography, Button, TextField, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import axios from 'axios';

const ItemDisplay = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
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
      stock: data.quantity
    };

    axios
      .post(`${API_URL}/cart`, cartItem)
      .then((response) => {
        console.log(response.data);
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error);
      });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ marginTop: '104px' }}>
      <Grid container sx={{ margin: 'auto', maxWidth: '63%' }}>
        <Grid item xs={12} sx={{ marginLeft: '30px' }}>
          <TextField
            label="Search Products"
            variant="outlined"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} sx={{ margin: '0 auto', maxWidth: '63%' }}>
        {filteredItems.map(item => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.name}>
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia style={{ paddingTop: '56.35%' }} image={item.image} title={item.name} />
              <CardContent style={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" gutterBottom>{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">Price: ${item.price}</Typography>
                <Typography variant="body2" color="textSecondary">Quantity: {item.quantity}</Typography>
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
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        autoHideDuration={1500}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity="info"
        >
          Item added to cart successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ItemDisplay;
