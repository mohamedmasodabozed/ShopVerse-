import Tag from "./Tag.jsx";
import FlashSalesHeader from "./FlashSalesHeader.jsx";
import FlashSalesBody from "./FlashSalesBody.jsx";
import ShowMoreButton from "./ShowMoreButton.jsx";

export default function FlashSales() {
    return (
        <div className="flash-sales">
            <Tag text = "Today’s" />
            <FlashSalesHeader days={1} hours={2} minutes={30} seconds={45} />
            <FlashSalesBody />
            <ShowMoreButton text="Show More" />
        </div>
    );
}