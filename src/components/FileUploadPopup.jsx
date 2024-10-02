import React, { useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';
import { useFlashMessage } from '../context/FlashMessageContext';

const FileUploadPopup = ({ price, open, handleClose, handleSubmit }) => {
  const showMessage = useFlashMessage(); // Get the showMessage function
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage button disable

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handlePopupSubmit = async () => {
    if (file && !isSubmitting) {
      setIsSubmitting(true); // Disable the button
      showMessage('Your Data is Being Processed ', 'success')
      await handleSubmit(file);
      showMessage('File is Submitted, It Might Take a Few Minutes To Verify Your Payment', 'success')
      setIsSubmitting(false); // Reset the button after submission is complete
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '400px' },
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
          borderRadius: 2,
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
            Thank You For Deciding On Purchasing Our Course.<br/>
            Please send {price} Birr To One Of The Folloing Numbers Via Telebirr<br/>
            <em>- 0910032575</em><br/>
            And Then, Upload A Screenshot Of Your Receipt.<br/>
            (Only a Screenshot)<br/>

        </Typography>
        <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{ mb: 2 }}
        >
          📁 Upload Screenshot
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        {file && (
          <Box sx={{ textAlign: 'center' }}>
            <img src={URL.createObjectURL(file)} alt="Selected" style={{ maxWidth: '100%', borderRadius: '8px' }} />
          </Box>
        )}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            onClick={handlePopupSubmit}
            disabled={isSubmitting} // Disable button if submitting
          >
            Submit
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FileUploadPopup;
