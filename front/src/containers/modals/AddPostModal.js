import React from 'react';
import Box from '@mui/material/Box';
import { Button, Modal, MenuItem } from '@mui/material';
import AddPost from '../post/AddPost';

const AddPostModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <MenuItem
        component={Button}
        onClick={handleOpen}
        sx={{
          width: '100%',
          textTransform: 'capitalize',
          borderLeft: 1,
        }}
      >
        Add post
      </MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="edit-modal modal">
          <AddPost handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
};

export default AddPostModal;
