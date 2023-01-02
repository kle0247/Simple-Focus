import React, { useState, useEffect, useCallback } from 'react';
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
                        paddingTop: '4px',
                        '&:active':
                        {
                            transform: 'rotate(90deg)',
                            color: '#1976d2'
                        }
                    }
                })
            }
        }, 
        MuiAppBar: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    color: 'black',
                    backgroundColor: 'white',
                    boxShadow: '0px 0px 0px 0px',
                    padding: '0.5rem 1.5rem'
                }
            }
        }
    }
});

function Timer() {
    const [focusTime, setFocusTime] = useState(true);
    const [breakTime, setBreakTime] = useState(false);

    const [min, setMin] = useState(window.localStorage?.getItem('focus') || 25);
    const [sec, setSec] = useState(0);

    const [start, setStart] = useState(false);
    const [stop, setStop] = useState(false);

    const handleKeyPress = useCallback((event) => {
        if( event.key === ' ' && !start ){
            startTimer();
        } else if( event.key === ' ' && start) {
            stopTimer();
        } else if( event.key === 'r'){
            reset()
        } else if( event.key === 'b'){
            breakOn()
        } else if( event.key === 'f'){
            focusOn()
        }
    }, [start, stop, reset, focusOn, breakOn]);

    function stopTimer() {
        setStart(false);
        setStop(true);
    }

    function startTimer() {
        setStart(true);
        setStop(false);
    }

    function reset() {
        setMin(focusTime ? (window.localStorage?.getItem('focus') || 25) : (window.localStorage?.getItem('break') || 10));
        setSec(0);
        setStart(false);
        setStop(true);
    }

    function breakOn() {
        setFocusTime(false);
        setBreakTime(true);
        setMin((window.localStorage?.getItem('break') || 10));
        setSec(0);
    }

    function focusOn() {
        setBreakTime(false);
        setFocusTime(true);
        setMin((window.localStorage?.getItem('focus') || 25));
        setSec(0);
    }

    function play() {
        new Audio(sound).play();
    }

    useEffect(() => {
        let countdown;
        
        document.addEventListener('keydown', handleKeyPress);
         
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

        return (() => {
            clearInterval(countdown);
            document.removeEventListener('keydown', handleKeyPress);
        });
    }, [start, sec, min, stop, handleKeyPress]); 

    return (
        <Box>
            <ThemeProvider theme={theme}>
                <Navbar setTimer={setMin} setSec={setSec} setStart={setStart} />
                <ToggleButton
                    value='focus'
                    selected={focusTime ? true : false}
                    variant='contained'
                    onClick={() => focusOn()}>
                    focus
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

                <Button disabled={sec === 0 && min === 0} variant='contained' onClick={() => startTimer()  }>start</Button>
                <Button disabled={sec === 0 && min === 0}  variant='contained' onClick={() => stopTimer()}>stop</Button>
            </ThemeProvider>
        </Box>
    )
}

export default Timer;