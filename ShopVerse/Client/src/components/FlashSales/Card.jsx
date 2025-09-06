import AddToCart from './AddToCart';
import DiscountTag from './DiscountTag';
import { useState, useEffect } from 'react';
import CardPopup from './CardPopup';
import { Link, useNavigate } from 'react-router-dom';

export default function Card(props) {
    // For navigation with scroll to top
    const navigate = useNavigate();
    // Normalize the product data structure
    const product = props.product || props;
    
    // Get properties based on either structure
    const image = product.image || (product.productImage?.URL || "https://via.placeholder.com/150");
    const title = product.title || product.productName || "Product";
    const description = product.description || product.productDescription || "";
    const price = product.price || `$${(product.finalPrice || product.productPrice || 0).toFixed(2)}`;
    const rating = product.rating || 4; // Default rating
    const discountPercentage = product.discountPercentage || product.productDiscount || 0;
    const productId = product._id || product.id || "";
    
    // Debug product data
    console.log("Normalized product data:", { 
        image, title, description, price, rating, discountPercentage, productId 
    });
    
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    
    // Auto-close popup after 3 seconds
    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => {
                setShowPopup(false);
            }, 3000);
            
            return () => clearTimeout(timer);
        }
    }, [showPopup]);
    
    let stars = "⭐".repeat(rating || 0).split('');
    
    const handleAddToCart = () => {
        console.log(`Adding ${title} to cart`);
        
        // Get auth token
        const token = localStorage.getItem("authToken");
        
        if (!token) {
            setPopupMessage("Please log in to add items to your cart");
            setShowPopup(true);
            return;
        }
        
        if (!productId) {
            console.error("No product ID available");
            setPopupMessage("Unable to add this product to cart");
            setShowPopup(true);
            return;
        }

        console.log("Adding product with ID:", productId);

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
                setPopupMessage(`${title} added to your cart!`);
                setShowPopup(true);
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
            setPopupMessage("Could not add to cart. Please try again.");
            setShowPopup(true);
        });
    };

    return (
        <div className="flash-sales-card px-6 py-4 shadow-4xl bg-gray-100 rounded-lg transition delay-300" style={{ position: 'relative' }}>
            {showPopup && (
                <div style={{ 
                    position: 'absolute',
                    top: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    width: '90%'
                }}>
                    <CardPopup message={popupMessage} />
                </div>
            )}
            <div className="card-image-container">
                <img className="w-11/12 h-48 object-cover rounded-lg" src={image} alt={title} />
                {discountPercentage > 0 && <DiscountTag discountPercentage={discountPercentage} />}
                <AddToCart onAddToCart={handleAddToCart} />
            </div>
            <div className="card-content">
                <h3>{title}</h3>
                <p>{description}</p>
                <span>{price}</span>
                <div className="rating">
                    <ul>
                        {stars.map((star, index) => (
                            <li key={index} className='relative -right-10'>{star}</li>
                        ))}
                    </ul>
                </div>
                <button 
                    onClick={() => {
                        navigate(`/product/${productId}`);
                        window.scrollTo(0, 0);
                    }} 
                    className='bg-red-500 text-white text-center py-2 px-4 rounded hover:bg-red-600 transition-colors'
                >
                    Show Details
                </button>
            </div>
        </div>
    );
}
