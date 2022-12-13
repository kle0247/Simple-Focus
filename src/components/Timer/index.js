import React, { useState, useEffect } from 'react';

function Timer() {

    const [hr, setHr] = useState(0);
    const [min, setMin] = useState(25);
    const [sec, setSec] = useState(0);

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