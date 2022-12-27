import React from 'react';
import EditTimer from '../EditTimer';

function Navbar({setTimer}){
    return(
        <div className='navbar'>
            <h1>SIMPLE FOCUS</h1>
            <EditTimer setTimer={setTimer} />
        </div>
    )
};

export default Navbar;