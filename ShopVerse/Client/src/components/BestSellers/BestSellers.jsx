import FlashSales from "../FlashSales/FlashSales";
import Advertise from "./Advertise";
export default function BestSellers(props) {
    return (
        <div className="BestSellers">
            {props.userName && (
                <div style={{marginBottom: '1rem', fontWeight: 'bold', color: '#DB4444'}}>
                    Welcome, {props.userName}!
                </div>
            )}
            <FlashSales 
                text="This Month" 
                show={false} 
                products={props.products} 
            />
        </div>
    );
}
