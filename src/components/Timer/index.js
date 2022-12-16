import React, { useState, useEffect } from 'react';

function Timer() {
    //default timer

    const [min, setMin] = useState(window.localStorage.getItem('min')*1);
    const [sec, setSec] = useState(0);

    const [start, setStart] = useState(false);
    const [stop, setStop] = useState(false);

    function stopTimer() {
        setStart(false);
        setStop(true);
    }

    useEffect(() => {
        if (start === true && (sec > 0 || min > 0 )){ //|| hr > 0)) {
            let countdown = setInterval(() => {
                setSec(sec - 1);

                if (sec === 0 && min !== 0) {
                    setMin(min - 1);
                    setSec(59);
                }
            }, 1000); //in 1 sec intervals}

            if (stop === true) {
                return () => clearInterval(countdown);
            }
            return () => clearInterval(countdown);
        }
    }, [start, sec, min, stop]); //just need to update when start is true

    return (
        <div>
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