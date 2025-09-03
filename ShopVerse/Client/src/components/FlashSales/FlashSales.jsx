import Tag from "./Tag.jsx";
import FlashSalesHeader from "./FlashSalesHeader.jsx";
import FlashSalesBody from "./FlashSalesBody.jsx";
import ShowMoreButton from "./ShowMoreButton.jsx";
import Separator from "./Seprator.jsx";

export default function FlashSales(props) {
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
                days={1}
                hours={2}
                minutes={30}
                seconds={45}
                show={show}
            />
            <FlashSalesBody products={props.products} />
            <ShowMoreButton text="Show More" />
        </div>
    );
} 
