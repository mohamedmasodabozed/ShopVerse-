import Header from "../Header";
import Footer from "../Footer/Footer";
import "./Cart.css";
import { useEffect, useState, useMemo } from "react";
export default function Maincart() 
{
  // Removed old exampleForReturn and counter logic
  // Removed old counter state and handleIncrease; now handled per item below
        const initialCartItems = useMemo(() => [
          {
            id: 1,
            title: "Wireless Headphones",
            price: 120,
            image: "https://picsum.photos/200",
            quantity: 1,
            shipping : 5.99
          },
          {
            id: 2,
            title: "Smartph one Case",
            price: 25,
            image: "https://picsum.photos/200",
            quantity: 1,
            shipping : 5.99
          },
          {
            id: 3,
            title: "Smart Watch",
            price: 250,
            image: "https://picsum.photos/200",
            quantity: 1,
            shipping : 5.99
          },
        ], []);
        const [cartItems, setCartItems] = useState(initialCartItems);
        const token = localStorage.getItem("authToken");
        useEffect(()=>{
          if (token) {
                    fetch("http://localhost:3000/cart", {
                        method: "GET",
                        headers: {
                            Authorization: token
                        }
                    })
                    .then((response) => response.json())
                    .then((data) => {
                      // Format the API response to match our component's expected structure
                      const formattedCartItems = Array.isArray(data) ? data.map(item => ({
                        id:item._id,
                        price:item.product?.productPrice || 0,
                        image: item.product?.productImage || 'https://picsum.photos/200',
                        quantity: item.quantity || 1,
                        shipping: item.product?.shipping || 5.99
                      })) : [];
                      console.log(data);
                      setCartItems(formattedCartItems.length > 0 ? formattedCartItems : initialCartItems);
                      console.log("Formatted cart items:", formattedCartItems);
                    })
                    .catch((error) => {
                      console.error("Error fetching cart items:", error);
                    });
                }
            }, [token, initialCartItems]);
        
        const handleIncrease = (index) => {
          setCartItems((prevItems) =>
            prevItems.map((item, i) =>
              i === index ? { ...item, quantity: item.quantity + 1 } : item
            )
          );
        };
        const getShippingCost = () => {
          return cartItems.reduce((acc, item) => acc + (item.shipping || 5.99), 0);
        };
        const handleDecrease = (index) => {
          setCartItems((prevItems) =>
            prevItems.map((item, i) =>
              i === index && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
          );
        };
        const subtotalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  // Removed leftover old counter decrement logic
  return (
    <div>
      <Header isLoggedIn={true} />
      <div className="cart-page-container">
        <h1 className="cart-title">Shopping Cart</h1>
        
        <div className="cart-content">
          <div className="cart-items-container">
            <table className="cart-table">
              <thead>
                <tr>
                  <th className="product-col">Product</th>
                  <th className="price-col">Price</th>
                  <th className="quantity-col">Quantity</th>
                  <th className="total-col">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item.id}>
                    <td className="product-info">
                      <div className="product-image">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="product-details">
                        <h3>{item.title}</h3>
                        <p className="product-category">{item.product?.category || "Electronics"}</p>
                      </div>
                    </td>
                    <td className="price-col">${item.price.toFixed(2)}</td>
                    <td className="quantity-col">
                      <div className="quantity-control">
                        <button className="quantity-btn decrease" onClick={() => handleDecrease(index)}>-</button>
                        <input type="number" min="1" value={item.quantity} readOnly />
                        <button className="quantity-btn increase" onClick={() => handleIncrease(index)}>+</button>
                      </div>
                    </td>
                    <td className="total-col">${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="cart-actions">
              <button className="continue-shopping">Continue Shopping</button>
              <button className="update-cart">Update Cart</button>
            </div>
          </div>
          
          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="coupon-section">
              <h3>Apply Coupon</h3>
              <div className="coupon-form">
                <input type="text" placeholder="Enter coupon code" />
                <button type="submit">Apply</button>
              </div>
            </div>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span className="amount">${subtotalAmount.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="amount">${getShippingCost().toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span className="amount">${(subtotalAmount + getShippingCost()).toFixed(2)}</span>
              </div>
              
              <button className="checkout-button">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}