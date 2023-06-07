import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const PostButton = ({ postData, onClose, setErrorMessage }) => {
  const handleClick = async () => {
    // Check if all fields have values
    if (!postData.image || !postData.name || !postData.user || !postData.price || !postData.email) {
      // Update error message
      setErrorMessage('Please fill out all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:9000/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    onClose(true);
  };

  return (
    <Button variant="contained" onClick={handleClick}>Post Data</Button>
  );
};

const You = () => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [price, setPrice] = useState(0);
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = (clearFields) => {
    setOpen(false);
    if (clearFields) {
      setImage('');
      setName('');
      setUser('');
      setPrice(0);
      setEmail('');
      setErrorMessage('');
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen} sx={{ marginTop: '16px' }}>Add an Item</Button>

      <Modal
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          minWidth: '300px'
        }}>
          <h2 id="modal-modal-title">Add an Item</h2>
          {errorMessage && <p>{errorMessage}</p>}
          <form>
            <TextField
              label="Item Name"
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth
              margin="normal"
              required
            /><br />
            <TextField
              label="Seller"
              value={user}
              onChange={e => setUser(e.target.value)}
              fullWidth
              margin="normal"
              required
            /><br />
            <TextField
              label="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
            /><br />
            <TextField
              label="Image URL"
              value={image}
              onChange={e => setImage(e.target.value)}
              fullWidth
              margin="normal"
              required
            /><br />
            <TextField
              label="Price"
              value={price}
              onChange={e => setPrice(e.target.value)}
              fullWidth
              margin="normal"
              required
            /><br />
          </form>
          <Stack direction="row" spacing={2}>
            <PostButton postData={{ image, name, user, price, email }} onClose={handleClose} setErrorMessage={setErrorMessage} />
            <Button variant="contained" onClick={() => handleClose(true)}>Cancel</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default You;
