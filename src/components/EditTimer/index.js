import React, { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { Modal, Box, Typography, TextField, Select, MenuItem, FormControl, Button } from '@mui/material';

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

function EditTimer({setTimer}) {
    const [min, setMin] = useState(0);
    const [timerType, setTimerType] = useState('');
    const [error, setError ] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleClick(){  
        window.localStorage.setItem(timerType, min);
        setTimer(min);
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
                    <FormControl onSubmit={handleClick}>
                        <Select
                            value={timerType}
                            label="Timer"
                            type='text'
                            onChange={ (ev) => setTimerType(ev.target.value) }
                        >
                            <MenuItem value='study'>study</MenuItem>
                            <MenuItem value='break'>break</MenuItem>
                        </Select>
                        <TextField 
                            type='number' 
                            label='minutes'
                            onChange={ (ev) => setMin(ev.target.value) }
                        />

                        <Button onClick={handleClick}>Set Timer</Button>
                    </FormControl>    

                </Box>
            </Modal>
        </div>
    )
};

export default EditTimer;