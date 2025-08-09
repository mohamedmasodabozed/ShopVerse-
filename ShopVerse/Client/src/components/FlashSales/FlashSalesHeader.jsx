import { useEffect, useRef } from "react";
import Arrows from "./Arrows";
import FlashSalesHeaderText from "./FlashSalesHeaderText.jsx";

export default function FlashSalesHeader(props) {
    const { days, hours, minutes, seconds, setDays, setHours, setMinutes, setSeconds } = props;
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            } else if (minutes > 0) {
                setMinutes(minutes - 1);
                setSeconds(59);
            } else if (hours > 0) {
                setHours(hours - 1);
                setMinutes(59);
                setSeconds(59);
            } else if (days > 0) {
                setDays(days - 1);
                setHours(23);
                setMinutes(59);
                setSeconds(59);
            } else {
                // Timer reached zero, stop the countdown
                clearInterval(intervalRef.current);
            }
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [days, hours, minutes, seconds, setDays, setHours, setMinutes, setSeconds]);
    return (
        <div className="flash-sales-header">
            <FlashSalesHeaderText title={props.title || "Flash Sales"} />
            {props.show && (
                <ul className="clock">
                    <li><p>Days</p> <h3><span>{days < 10 ? `0${days}` : days}</span></h3></li>
                    <li className="colon"><span>:</span></li>
                    <li><p>Hours</p> <h3><span>{hours < 10 ? `0${hours}` : hours}</span></h3></li>
                    <li className="colon"><span>:</span></li>
                    <li><p>Minutes</p> <h3><span>{minutes < 10 ? `0${minutes}` : minutes}</span></h3></li>
                    <li className="colon"><span>:</span></li>
                    <li><p>Seconds</p> <h3><span>{seconds < 10 ? `0${seconds}` : seconds}</span></h3></li>
                </ul>
            )}
            <Arrows />
        </div>
    );
}
