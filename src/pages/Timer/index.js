import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { Box, Button, createTheme, ThemeProvider, ToggleButton } from '@mui/material';

const theme = createTheme({
    components: {
        MuiButton: {
            variants: [
                {
                    props: {
                        variant: 'contained'
                    },
                    style: {
                        width: '227px',
                        height: '79px',
                        backgroundColor: '#F69B9B',
                        fontSize: '50px',
                        margin: '1rem',
                        borderRadius: '10px',
                        boxShadow: '3'
                    }
                }
            ]
        }
    }
});

const toggleButtonSx = {
    width: '227px',
    height: '79px',
    backgroundColor: '#F69B9B',
    fontSize: '50px',
    margin: '1rem',
    borderRadius: '10px',
    boxShadow: '3',
    color: 'white',
    '&:hover': {
        backgroundColor: '#1976d2',
        color: 'white'
    },
    "&[aria-pressed=true]": {
        backgroundColor: '#1976d2',
        color: 'white',
        boxShadow: '1'
    },
    "&[aria-pressed=true]:hover": {
        backgroundColor: '#1976d2',
        color: 'white'
    }
};

function Timer() {
    const [studyTime, setStudyTime] = useState(true);
    const [breakTime, setBreakTime] = useState(false);

    const [min, setMin] = useState(window.localStorage?.getItem('study') || 25);
    const [sec, setSec] = useState(0);

    const [start, setStart] = useState(false);
    const [stop, setStop] = useState(false);

    function stopTimer() {
        setStart(false);
        setStop(true);
    }

    function reset() {
        setMin(studyTime ? (window.localStorage?.getItem('study') || 25) : (window.localStorage?.getItem('break') || 10));
        setSec(0);
        setStart(false);
        setStop(true);
    }

    function breakOn() {
        setStudyTime(false);
        setBreakTime(true);
        setMin((window.localStorage?.getItem('break') || 10));
        setSec(0);
    }

    function studyOn() {
        setBreakTime(false);
        setStudyTime(true);
        setMin((window.localStorage?.getItem('study') || 25));
        setSec(0);
    }

    useEffect(() => {
        if (start === true && (sec > 0 || min > 0)) {
            let countdown = setInterval(() => {
                setSec(sec - 1);

                if (sec === 0 && min !== 0) {
                    setMin(min - 1);
                    setSec(59);
                }
            }, 1000); //in 1 sec intervals

            if (stop === true) {
                return () => clearInterval(countdown);
            }
            return () => clearInterval(countdown);
        }
    }, [start, sec, min, stop]); //just need to update when start is true

    return (
        <Box>
            <ThemeProvider theme={theme}>
                <Navbar setTimer={setMin} />
                <ToggleButton
                    sx={toggleButtonSx}
                    value='study'
                    selected={studyTime ? true : false}
                    variant='contained'
                    onClick={() => studyOn()}>
                    study
                </ToggleButton>
                <ToggleButton
                    sx={toggleButtonSx}
                    variant='contained'
                    value='break'
                    selected={breakTime ? true : false}
                    onClick={() => breakOn()}>
                    break
                </ToggleButton>
                <Button variant='contained' onClick={() => reset()}>reset</Button>

                <Box className='timer'>
                    {
                        min < 10 ? `0${min}` : `${min}`
                    }:{
                        sec < 10 ? `0${sec}` : `${sec}`
                    }
                </Box>

                <Button variant='contained' onClick={() => setStart(true)}>start</Button>
                <Button variant='contained' onClick={() => stopTimer()}>stop</Button>
            </ThemeProvider>
        </Box>
    )
}

export default Timer;