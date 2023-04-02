import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';
import { socket } from '@/socket';

function Modal({thisUser}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    socket.emit("note:create",{title:title,description:description,user:thisUser})
    handleClose();
  };

  return (
    <div>
      <Button startIcon="+" variant="contained" onClick={() => setOpen(true)}>
        Create
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Note</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the title and description for your new Note:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Modal;
