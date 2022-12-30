import React from 'react';
import EditTimer from '../EditTimer';
import { 
    Box
} from '@mui/material';

function Navbar({setTimer, setSec, setStart}){
    return(
        <Box className='navbar'>
            <h1>SIMPLE FOCUS</h1>
            <EditTimer setTimer={setTimer} setSec={setSec} setStart={setStart} />
        </Box>
    )
};

export default Navbar;