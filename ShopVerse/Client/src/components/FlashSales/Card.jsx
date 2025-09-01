import AddToCart from './AddToCart';
import DiscountTag from './DiscountTag';

export default function Card(props) {
    // Use only necessary props instead of logging the entire props object
    const { image, title, description, price, rating, discountPercentage, _id, id } = props;
    
    let stars = "⭐".repeat(rating || 0).split('');
    
    const handleAddToCart = () => {
        console.log(`Adding ${title} to cart`);
        
        // Get auth token
        const token = localStorage.getItem("authToken");
        
        if (!token) {
            alert("Please log in to add items to your cart");
            return;
        }
        
        // Add your cart logic here
        const productId = "68ae22d2f6b53975d3a4f03a";

        fetch(`http://localhost:3000/cart/add/${productId}`, {
            method: "PATCH",
            body: JSON.stringify({
                quantity: 1,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        })
        .then(response => {
            if (response.ok) {
                alert(`${title} added to your cart!`);
                return response.json();
            } else {
                throw new Error('Failed to add to cart');
            }
        })
        .then(data => {
            console.log("Added to cart successfully:", data);
        })
        .catch(error => {
            console.error("Error adding to cart:", error);
            alert("Could not add to cart. Please try again.");
        });
    };

    return (
        <div className="flash-sales-card">
            <div className="card-image-container">
                <img src={image} alt="Product" />
                <DiscountTag discountPercentage={discountPercentage} />
                <AddToCart onAddToCart={handleAddToCart} />
            </div>
            <div className="card-content">
                <h3>{title}</h3>
                <p>{description}</p>
                <span>{price}</span>
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
