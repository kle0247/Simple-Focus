import React, { useState, useEffect } from 'react';
import EditTimer from '../EditTimer';

function Timer() {

    const [studyTime, setStudyTime] = useState(true);
    const [breakTime, setBreakTime] = useState(false);

    const [min, setMin] = useState(25);
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
        <div>
            <button className='timerButton' onClick={() => studyOn()} >study</button>
            <button className='timerButton' onClick={() => breakOn()}>break</button>
            <button className='timerButton' onClick={() => reset()}>reset</button>

            <div className='timer'>
                {
                    min < 10 ? `0${min}` : `${min}`
                }:{
                    sec < 10 ? `0${sec}` : `${sec}`
                }
            </div>

            <button className='timerButton' onClick={() => setStart(true)}>start</button>
            <button className='timerButton' onClick={() => stopTimer()}>stop</button>
        </div>
    )
}

export default Timer;