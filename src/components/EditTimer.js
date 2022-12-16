import React, { useEffect, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { Modal, Box, Typography, TextField } from '@mui/material';

const style = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 24,
    padding: 4,
  };

function EditTimer() {
    const [min, setMin] = useState('');
    const [error, setError ] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function setNewTimer(){
        window.localStorage.setItem('min', min);
        handleClose();
    }
    
    return (
        <div>
            <SettingsIcon 
                sx={{ 
                    width: '69px', 
                    height: '67px', 
                    '&:active': 
                        { transform: 'rotate(90deg)', 
                          color: '#F0DCDC'
                        } 
                    }} 
                fontSize='large' 
                onClick={handleOpen} 
            />
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography>Set Timer</Typography>
                    <TextField 
                        type='number' 
                        label='minutes'
                        onChange={ (ev) => setMin(ev.target.value)}
                    />
                    <button onClick={() => setNewTimer()}>Set Timer</button>
                </Box>
            </Modal>
        </div>
    )
};

export default EditTimer;