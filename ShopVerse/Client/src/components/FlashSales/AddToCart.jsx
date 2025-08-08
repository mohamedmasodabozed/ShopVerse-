import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function AddToCart({ onAddToCart }) {
    const handleClick = (e) => {
        e.stopPropagation(); // Prevent card click event
        if (onAddToCart) {
            onAddToCart();
        }
    };

    return (
        <button className="add-to-cart-btn" onClick={handleClick}>
            <FontAwesomeIcon icon={faShoppingCart} />
            <span>Add to Cart</span>
        </button>
    );
}
