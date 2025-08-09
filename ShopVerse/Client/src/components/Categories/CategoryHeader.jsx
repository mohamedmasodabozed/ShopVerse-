import FlashSalesHeaderText from "../FlashSales/FlashSalesHeaderText.jsx";
import Arrows from "../FlashSales/Arrows.jsx";
export default function CategoryHeader() {
    return (
        <div className="flash-sales-header">
            <FlashSalesHeaderText title="Browse By Category" />
            <Arrows />       
             </div>
    );
}
