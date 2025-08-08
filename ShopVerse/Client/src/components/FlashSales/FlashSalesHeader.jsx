import Arrows from "./Arrows";
import FlashSalesHeaderText from "./FlashSalesHeaderText.jsx";
export default function FlashSalesHeader(props) {
    return (
        <div className="flash-sales-header">
            <FlashSalesHeaderText title="Flash Sales" />
            <ul className="clock">
                <li><p>Days</p> <h3><span>{props.days < 10 ? `0${props.days}` : props.days}</span></h3></li>
                <li className="colon"><span>:</span></li>
                <li><p>Hours</p> <h3><span>{props.hours < 10 ? `0${props.hours}` : props.hours}</span></h3></li>
                <li className="colon"><span>:</span></li>
                <li><p>Minutes</p> <h3><span>{props.minutes < 10 ? `0${props.minutes}` : props.minutes}</span></h3></li>
                <li className="colon"><span>:</span></li>
                <li><p>Seconds</p> <h3><span>{props.seconds < 10 ? `0${props.seconds}` : props.seconds}</span></h3></li>
            </ul>
            <Arrows />
        </div>
    );
}
