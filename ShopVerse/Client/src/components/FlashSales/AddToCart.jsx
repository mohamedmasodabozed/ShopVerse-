import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function AddToCart({ onAddToCart }) {
    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof onAddToCart === 'function') {
            onAddToCart();
        } else {
            console.error("onAddToCart is not a function");
        }
    };

    return (
        <button className="add-to-cart-btn" onClick={handleClick}>
            <FontAwesomeIcon icon={faShoppingCart} />
            <span>Add to Cart</span>
        </button>
    );
}
