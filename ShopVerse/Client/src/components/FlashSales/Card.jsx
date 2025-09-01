import AddToCart from './AddToCart';
import DiscountTag from './DiscountTag';

export default function Card(props) {
    console.log(props);
    let stars = "⭐".repeat(props.rating).split('');
    console.log(stars);
    const handleAddToCart = () => {
        console.log(`Adding ${props.title} to cart`);
        // Add your cart logic here
            fetch("http://localhost:3000/Controller/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: props.title,
                    price: props.price,
                    image: props.image
                })
            });
    };

    return (
        <div className="flash-sales-card">
            <div className="card-image-container">
                <img src={props.image} alt="Product" />
                <DiscountTag discountPercentage={props.discountPercentage} />
                <AddToCart onAddToCart={handleAddToCart} />
            </div>
            <div className="card-content">
                <h3>{props.title}</h3>
                <p>{props.description}</p>
                <span>{props.price}</span>
                <div className="rating">
                    <ul>
                        {stars.map((star, index) => (
                            <li key={index}>{star}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
