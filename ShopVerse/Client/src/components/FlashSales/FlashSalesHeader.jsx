import { useEffect, useRef, useState } from "react";
import Arrows from "./Arrows";
import FlashSalesHeaderText from "./FlashSalesHeaderText.jsx";

export default function FlashSalesHeader(props) {
    // Use local state for countdown instead of props to avoid re-renders
    const [timeLeft, setTimeLeft] = useState({
        days: props.days || 1,
        hours: props.hours || 2,
        minutes: props.minutes || 30,
        seconds: props.seconds || 45
    });
    
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimeLeft(prevTime => {
                const { days, hours, minutes, seconds } = prevTime;
                
                if (seconds > 0) {
                    return { ...prevTime, seconds: seconds - 1 };
                } else if (minutes > 0) {
                    return { ...prevTime, minutes: minutes - 1, seconds: 59 };
                } else if (hours > 0) {
                    return { ...prevTime, hours: hours - 1, minutes: 59, seconds: 59 };
                } else if (days > 0) {
                    return { days: days - 1, hours: 23, minutes: 59, seconds: 59 };
                } else {
                    // Timer reached zero, stop the countdown
                    clearInterval(intervalRef.current);
                    return prevTime;
                }
            });
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []); // Empty dependency array, so it only runs once
    return (
        <div className="flash-sales-header">
            <FlashSalesHeaderText title={props.title || "Flash Sales"} />
            {props.show && (
                <ul className="clock">
                    <li><p>Days</p> <h3><span>{timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}</span></h3></li>
                    <li className="colon"><span>:</span></li>
                    <li><p>Hours</p> <h3><span>{timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}</span></h3></li>
                    <li className="colon"><span>:</span></li>
                    <li><p>Minutes</p> <h3><span>{timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}</span></h3></li>
                    <li className="colon"><span>:</span></li>
                    <li><p>Seconds</p> <h3><span>{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</span></h3></li>
                </ul>
            )}
            <Arrows />
        </div>
    );
}
