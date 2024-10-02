import React, { useState } from 'react';
import { Modal, Box, Button, Typography, Slider, TextField } from '@mui/material';

const RatingPopup = ({ open, handleClose, handleSubmit }) => {
    const [rating, setRating] = useState(3);
    const [comment, setComment] = useState('');

    const marks = [
        { value: 1, label: '1 Star' },
        { value: 2, label: '2 Stars' },
        { value: 3, label: '3 Stars' },
        { value: 4, label: '4 Stars' },
        { value: 5, label: '5 Stars' },
    ];

    const onSubmit = () => {
        handleSubmit({ rating, comment });
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: '400px' }, // 90% width on small screens, 400px on larger ones
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 2,
                    borderRadius: 2,
                    maxHeight: '80vh', // To keep it within view on small devices
                    overflowY: 'auto', // Allow scrolling if content overflows
                }}
            >
                <Typography variant="h6" component="h2" gutterBottom>
                    Rate and Comment
                </Typography>
                <Typography gutterBottom>
                    Your Rating:
                </Typography>
                <Slider
                    value={rating}
                    onChange={(e, value) => setRating(value)}
                    min={1}
                    max={5}
                    step={1}
                    marks={marks}
                    valueLabelDisplay="auto"
                    getAriaValueText={(value) => `${value} Star${value > 1 ? 's' : ''}`}
                    sx={{
                        color: '#fbc02d',
                        '& .MuiSlider-thumb': {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: '-10px',
                                left: '-10px',
                                right: '-10px',
                                bottom: '-10px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            },
                        },
                    }}
                />
                <Box display="flex" justifyContent="space-between" mb={2}>
                    {[...Array(5)].map((_, index) =>
                        index < rating ? (
                            <span key={index} style={{ fontSize: '28px', color: '#fbc02d' }}>★</span> // Filled star
                        ) : (
                            <span key={index} style={{ fontSize: '28px', color: '#fbc02d' }}>☆</span> // Empty star
                        )
                    )}
                </Box>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    label="Your Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    sx={{ mb: 2 }} // Margin bottom for spacing
                />
                <Box mt={2} display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
                    <Button variant="contained" color="primary" onClick={onSubmit}>
                        Submit
                    </Button>
                    <Button variant="outlined" onClick={handleClose} sx={{ mt: { xs: 1, sm: 0 } }}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default RatingPopup;
