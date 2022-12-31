import React from 'react';
import EditTimer from '../EditTimer';
import {
    AppBar,
    Box
} from '@mui/material';

function Navbar({ setTimer, setSec, setStart }) {
    return (
        <AppBar>
            <Box className='navbar'>
                <h1>SIMPLE FOCUS</h1>
                <EditTimer setTimer={setTimer} setSec={setSec} setStart={setStart} />
            </Box>
        </AppBar>
    )
};

export default Navbar;