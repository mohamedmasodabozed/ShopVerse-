import Tag from "../FlashSales/Tag.jsx";
import FlashSalesHeaderText from "../FlashSales/FlashSalesHeaderText.jsx";
import ArrivalCard from "./ArrivalCard.jsx";

export default function NewArrival({ products }) {
    // Default New Arrival products data if none are passed
    const defaultArrivalProducts = [
        {
            img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop",
            title: "PlayStation 5",
            description: "Black and White version of the PS5 coming out on sale.",
            link: "Shop Now"
        },
        {
            img: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400&h=300&fit=crop",
            title: "Women's Collections",
            description: "Featured woman collections that give you another vibe.",
            link: "Shop Now"
        },
        {
            img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
            title: "Speakers",
            description: "Amazon wireless speakers with premium sound quality.",
            link: "Shop Now"
        },
        {
            img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
            title: "Perfume",
            description: "GUCCI INTENSE OUD EDP luxury fragrance collection.",
            link: "Shop Now"
        }
    ];

    // Use passed products or fall back to default products
    const productsToDisplay = products || defaultArrivalProducts;

    return (
        <div className="new-arrival">
            <Tag text="Featured" />
            <FlashSalesHeaderText title="New Arrival" />
            <ArrivalCard products={productsToDisplay} />
        </div>
    );
}