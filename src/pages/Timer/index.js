import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import {
    Box,
    Button,
    createTheme,
    ThemeProvider,
    ToggleButton
} from '@mui/material';
import sound from '../../assets/timer-up.mp3';

const theme = createTheme({
    components: {
        MuiButton: { //name of component
            styleOverrides: {
                root: ({ ownerState }) => ({ //name of slot
                    ...ownerState.variant === 'contained' && {
                        width: '227px',
                        height: '79px',
                        backgroundColor: '#F69B9B',
                        fontFamily: 'Inter',
                        fontSize: '50px',
                        margin: '1rem',
                        borderRadius: '10px',
                        color: 'white',
                        /* offset-x | offset-y | blur-radius | spread-radius | color */
                        boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
                        border: '1px solid rgba(0, 0, 0, 0.12)'
                    }
                })
            }
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    width: '227px',
                    height: '79px',
                    backgroundColor: '#F69B9B',
                    fontFamily: 'Inter',
                    fontSize: '50px',
                    margin: '1rem',
                    borderRadius: '10px',
                    color: 'white',
                    boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
                    '&:hover': {
                        backgroundColor: '#1976d2',
                        color: 'white'
                    },
                    "&[aria-pressed=true]": {
                        backgroundColor: '#1976d2',
                        color: 'white',
                    },
                    "&[aria-pressed=true]:hover": {
                        backgroundColor: '#1976d2',
                        color: 'white'
                    }
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...ownerState.select && {
                        marginBottom: '1rem',
                        textAlign: 'left'
                    }
                })
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...ownerState.className === 'settingsIcon' && {
                        width: '69px',
                        height: '67px',
                        '&:active':
                        {
                            transform: 'rotate(90deg)',
                            color: '#1976d2'
                        }
                    }
                })
            }
        }
    }
});

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

    function play() {
        new Audio(sound).play();
    }

    useEffect(() => {
        let countdown
        if (start === true && (sec > 0 || min > 0)) {
            countdown = setInterval(() => {
                setSec(sec - 1);

                if (sec === 0 && min !== 0) {
                    setMin(min - 1);
                    setSec(59);
                }
            }, 1000); //in 1 sec intervals
        } else if (sec === 0 && min === 0) {
            play();
            return () => clearInterval(countdown);
        }
        return () => clearInterval(countdown);
    }, [start, sec, min, stop]); 

    return (
        <Box>
            <ThemeProvider theme={theme}>
                <Navbar setTimer={setMin} setSec={setSec} setStart={setStart} />
                <ToggleButton
                    value='study'
                    selected={studyTime ? true : false}
                    variant='contained'
                    onClick={() => studyOn()}>
                    study
                </ToggleButton>
                <ToggleButton
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

                <Button disabled={sec === 0 && min === 0} variant='contained' onClick={() => setStart(true)  }>start</Button>
                <Button disabled={sec === 0 && min === 0}  variant='contained' onClick={() => stopTimer()}>stop</Button>
            </ThemeProvider>
        </Box>
    )
}

export default Timer;