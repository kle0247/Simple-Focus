import React, { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import {
    Modal,
    Box,
    TextField,
    MenuItem,
    FormControl,
    Button
} from '@mui/material';


const style = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    borderRadius: '10px',
    boxShadow: 24,
    padding: 4
};

function EditTimer({ setTimer, setSec, setStart }) {
    const [min, setMin] = useState(0);
    const [timerType, setTimerType] = useState('');
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const isMinInvalid = (min) => min > 60 || min < 0 ;

    function handleClick() {
        window.localStorage.setItem(timerType, min);
        setTimer(min);
        setSec(0);
        setStart(false);
        handleClose();
    }

    return (
        <Box>
            <SettingsIcon
                onClick={handleOpen}
                className='settingsIcon'
            />
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <h1>SET YOUR TIMER</h1>
                    <FormControl onSubmit={handleClick}>
                        <TextField
                            select
                            type='text'
                            value={timerType}
                            label='select a timer'
                            onChange={(ev) => setTimerType(ev.target.value)}
                        >
                            <MenuItem value='study'>study</MenuItem>
                            <MenuItem value='break'>break</MenuItem>
                        </TextField>
                        <TextField
                            type='number'
                            label='minutes'
                            error={isMinInvalid(min)}
                            onChange={(ev) => setMin(ev.target.value)}
                            helperText='Minutes must be between 1 and 60' //between 0 and 61?
                        />
                        <Button disabled={isMinInvalid(min) || !min || !timerType } onClick={handleClick}>Set Timer</Button>
                    </FormControl>
                </Box>
            </Modal>
        </Box>
    )
};

export default EditTimer;