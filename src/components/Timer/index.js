import React, { useState, useEffect } from 'react';

function Timer() {
    //default timer
    window.localStorage.setItem('hr', 0);
    window.localStorage.setItem('min', 25);
    window.localStorage.setItem('sec', 0);

    const [hr, setHr] = useState(window.localStorage.getItem('hr')*1);
    const [min, setMin] = useState(window.localStorage.getItem('min')*1);
    const [sec, setSec] = useState(window.localStorage.getItem('sec')*1);

    const [start, setStart] = useState(false);
    const [stop, setStop] = useState(false);

    let countdown;

    function stopTimer() {
        setStart(false);
        setStop(true);
    }

    useEffect(() => {
        if (start === true && (sec > 0 || min > 0 || hr > 0)) {
            countdown = setInterval(() => {
                setSec(sec - 1);

                if (sec === 0 && min !== 0) {
                    setMin(min - 1);
                    setSec(59);
                }

                if (sec === 0 && min === 0 && hr !== 0) {
                    setHr(hr - 1);
                    setMin(59);
                    setSec(59);
                }
            }, 1000); //in 1 sec intervals}

            if (stop === true) {
                return () => clearInterval(countdown);
            }
            return () => clearInterval(countdown);
        }
    }, [start, sec, stop]); //just need to update when start is true

    return (
        <div>
            <div className='timer'>
                {
                    hr < 10 ? `0${hr}` : `${hr}`
                }:{
                    min < 10 ? `0${min}` : `${min}`
                }:{
                    sec < 10 ? `0${sec}` : `${sec}`
                }
            </div>

            <button onClick={() => setStart(true)}>start</button>
            <button onClick={() => stopTimer()}>stop</button>
        </div>
    )
}

export default Timer;