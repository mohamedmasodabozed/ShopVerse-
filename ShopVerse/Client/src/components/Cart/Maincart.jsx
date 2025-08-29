import Header from "../Header";
import Footer from "../Footer/Footer";
export default function Maincart() {
  return (
    <div>
      <Header isLoggedIn={true} />
     <div className="container">
        <ul className="cart-header">
            <li>product</li>
            <li>price</li>
            <li>quantity</li>
            <li>total</li>
        </ul>
        <ul className="cart-items">
            <li>
                <div className="product">
                <img src="https://picsum.photos/200" alt="" />
                <p>product name</p>
                </div>
                <p>120$</p>
                <input type="number" min="1" defaultValue="1" />
                <p>120$</p>
            </li>
            <li>
                <div className="product">
                    <img src="https://picsum.photos/200" alt="" />
                    <p>product name</p>
                </div>
                <p>120$</p>
                <input type="number" min="1" defaultValue="1" />
                <p>120$</p>
            
            </li>
            <li>
                <div className="product">
                    <img src="https://picsum.photos/200" alt="" />
                    <p>product name</p>
                </div>
                <p>120$</p>
                <input type="number" min="1" defaultValue="1" />
                <p>120$</p>
            </li>
        </ul>
        <div className="buttons cart-buttons">
            <button>update shop</button>
            <button>return to cart</button>
        </div>
        <div className="payment">
            <div className="add-coupon">
                <form action="#">
                    <input type="text" placeholder="Enter coupon code" />
                    <button type="submit">Apply</button>
                </form>
            </div>
            <div className="cart-total">
                <div className="subtotal">
                    <p>Subtotal:</p>
                    <p>$360</p>
                </div>
                <div className="shipping">
                    <p>Shipping:</p>
                    <p>$10</p>
                </div>
                <div className="total">
                    <p>Total:</p>
                    <p>$370</p>
                </div>
                <div className="buttons">
                    <button>Proceed to Checkout</button>
                </div>
            </div>
        </div>
     </div>
     <Footer />
    </div>
  );
}