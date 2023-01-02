import React from 'react';
import EditTimer from '../EditTimer';

import {
    AppBar,
    Box,
    Switch
} from '@mui/material';

function Navbar({ setTimer, setSec, setStart, setMode, mode }) {
    return (
        <AppBar>
            <Box className='navbar'>
                <h1>SIMPLE FOCUS</h1>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Switch onClick={ () => { mode === 'light' ? setMode('dark') : setMode('light') } } />
                <EditTimer setTimer={setTimer} setSec={setSec} setStart={setStart} />
                </Box>
            </Box>
        </AppBar>
    )
};

export default Navbar;