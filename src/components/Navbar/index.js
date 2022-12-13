import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';

function Navbar(){
    return(
        <div className='navbar'>
            <h1>SIMPLE FOCUS</h1>
            
            <SettingsIcon sx={{ width: '69px', height: '67px'}} fontSize='large' onClick={() => console.log('clicked')} />
        </div>
    )
};

export default Navbar;