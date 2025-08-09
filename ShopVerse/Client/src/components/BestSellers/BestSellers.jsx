import FlashSales from "../FlashSales/FlashSales";
import Advertise from "./Advertise";
export default function BestSellers(props) {
    return (
        <div className="BestSellers">
            <FlashSales 
                text="This Month" 
                show={false} 
                products={props.products} 
            />
        </div>
    );
}
