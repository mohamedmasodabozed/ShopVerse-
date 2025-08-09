import Tag from "./Tag.jsx";
import FlashSalesHeader from "./FlashSalesHeader.jsx";
import FlashSalesBody from "./FlashSalesBody.jsx";
import ShowMoreButton from "./ShowMoreButton.jsx";
import { useState } from "react";
import Separator from "./Seprator.jsx";

export default function FlashSales(props) {
    console.log(`show me Flash sales props ${JSON.stringify(props)}`)
    const [days, setDays] = useState(1);
    const [hours, setHours] = useState(2);
    const [minutes, setMinutes] = useState(30);
    const [seconds, setSeconds] = useState(45);
    
    // Get the display text based on props.text
    let displayText = props.text;
    let headerTitle = props.text;
    let show = props.show;
    if(props.text === "Today's") {
        headerTitle = "Flash Sales";
    } else if(props.text === "This Month") {
        headerTitle = "Best Selling Products";
    } else if(props.text === "our products") {
        headerTitle = "Explore Our Products";
        show = false;
    }
    
    return (
        <div className="flash-sales">
            <Tag text={displayText} />
            <FlashSalesHeader 
                title={headerTitle} 
                days={days} 
                hours={hours} 
                minutes={minutes} 
                seconds={seconds}
                setDays={setDays}
                setHours={setHours}
                setMinutes={setMinutes}
                setSeconds={setSeconds}
                show={show}
            />
            <FlashSalesBody products={props.products} />
            <ShowMoreButton text="Show More" />
        </div>
    );
} 
