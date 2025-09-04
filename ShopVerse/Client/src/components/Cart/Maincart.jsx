import Header from "../Header";
import Footer from "../Footer/Footer";
import "./Cart.css";
import "./CartExtras.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Popup from "../Popup";

export default function Maincart() 
{
        const [cartItems, setCartItems] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [isUpdating, setIsUpdating] = useState(false);
        const token = localStorage.getItem("authToken");
        const [showPopup, setShowPopup] = useState(false);
        const [popupMessage, setPopupMessage] = useState("");
        
        // Auto-close popup after 3 seconds
        useEffect(() => {
          if (showPopup) {
            const timer = setTimeout(() => {
              setShowPopup(false);
            }, 1000);
            
            return () => clearTimeout(timer);
          }
        }, [showPopup]);
        
        useEffect(() => {
          if (token) {
            setIsLoading(true);
            fetch("http://localhost:3000/cart", {
                method: "GET",
                headers: {
                    Authorization: token
                }
            })
            .then((response) => response.json())
            .then((data) => {
              if (data.Data && data.Data.products && Array.isArray(data.Data.products)) {
                setCartItems(data.Data.products);
                console.log("Cart items from API:", data.Data.products);
              } else {
                console.warn("Unexpected data format:", data);
                setCartItems([]);
              }
            })
            .catch((error) => {
              console.error("Error fetching cart items:", error);
              setCartItems([]);
            })
            .finally(() => {
              setIsLoading(false);
            });
          } else {
            setCartItems([]);
            setIsLoading(false);
          }
        }, [token]);
        const handleIncrease = (index) => {
          setCartItems((prevItems) =>
            prevItems.map((item, i) => {
              if (i !== index) return item;
              
              const stockQuantity = item.product?.productQuantity || 0;
              const currentQuantity = item.quantity || 1;
              
              // Only increase if we're not exceeding the stock quantity
              if (currentQuantity < stockQuantity) {
                return { ...item, quantity: currentQuantity + 1 };
              } else {
                // We could show a toast/alert here that max quantity is reached
                console.warn(`Cannot add more than ${stockQuantity} items (available in stock)`);
                return item;
              }
            })
          );
        };
        const getShippingCost = () => {
          return cartItems.length > 0 ? cartItems.length * 5.99 : 0;
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
        const subtotalAmount = cartItems.reduce((acc, item) => {
          const price = item.product?.productPrice || 0;
          const quantity = item.quantity || 1;
          return acc + price * quantity;
        }, 0);
        
        // Function to update cart quantities in the backend
        const updateCart = () => {
          if (!token) {
            alert("Please log in to update your cart");
            return;
          }
          
          setIsUpdating(true);
          
          // Create an array of updated quantities to send to the server
          const updates = cartItems.map(item => ({
            productId: item.product?._id,
            quantity: item.quantity
          }));
          
          fetch("http://localhost:3000/cart/update", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            },
            body: JSON.stringify({ items: updates })
          })
          .then(response => {
            if (!response.ok) {
              throw new Error("Failed to update cart");
            }
            return response.json();
          })
          .then(data => {
            alert("Cart updated successfully");
            console.log("Cart update response:", data);
          })
          .catch(error => {
            console.error("Error updating cart:", error);
            alert("Failed to update cart. Please try again.");
          })
          .finally(() => {
            setIsUpdating(false);
          });
        };
        const handleRemove = (productId) => {
          console.log("Removing product with ID:", productId); 
          if (!token) {
            setPopupMessage("Please log in to remove items from your cart");
            setShowPopup(true);
            return;
          }
          
          fetch(`http://localhost:3000/cart/remove/${productId}`, {
            method: "PATCH",
            headers: {
              Authorization: token
            }
          })
          .then(response => {
            if (!response.ok) {
              throw new Error("Failed to remove item from cart");
            }
            setPopupMessage("Item removed from cart successfully");
            setShowPopup(true);
            
            // Reload page after a reasonable delay (3 seconds)
            setTimeout(() => {
              window.location.reload();
            }, 2000);
            
            return response.json();
          })
          .then(data => {
            console.log("Cart update response:", data);
          })
          .catch(error => {
            console.error("Error updating cart:", error);
            setPopupMessage("Failed to update cart. Please try again.");
            setShowPopup(true);
          });
        }
  // Removed leftover old counter decrement logic
  return (
    <div>
      <Header isLoggedIn={true} />
      {showPopup && <Popup message={popupMessage} />}
      <div className="cart-page-container">
        <h1 className="cart-title">Shopping Cart</h1>
        
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "30px" }}>
            <div className="loading-spinner"></div>
            <p>Loading your cart items...</p>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items-container">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th className="product-col">Product</th>
                    <th className="price-col">Price</th>
                    <th className="quantity-col">Quantity</th>
                    <th className="total-col">Total</th>
                    <th className="remove-col">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                      <tr key={item._id || index}>
                        <td className="product-info">
                          <div className="product-image">
                            <img 
                              src={item.product?.productImage?.URL || "https://picsum.photos/200"} 
                              alt={item.product?.productName || "Product"} 
                            />
                          </div>
                          <div className="product-details">
                            <h3>{item.product?.productName || "Unknown Product"}</h3>
                            <p className="product-category">{item.product?.productCategory || "Electronics"}</p>
                            {(item.product?.productQuantity || 0) <= 5 && (
                              <p className="stock-warning">
                                {item.product?.productQuantity > 0 
                                  ? `Only ${item.product.productQuantity} left in stock!` 
                                  : "Out of stock!"}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="price-col">${(item.product?.productPrice || 0).toFixed(2)}</td>
                        <td className="quantity-col">
                          <div className="quantity-control">
                            <button 
                              className="quantity-btn decrease" 
                              onClick={() => handleDecrease(index)}
                              disabled={item.quantity <= 1}
                            >-</button>
                            <input type="number" min="1" value={item.quantity || 1} readOnly />
                            <button 
                              className="quantity-btn increase" 
                              onClick={() => handleIncrease(index)}
                              disabled={item.quantity >= (item.product?.productQuantity || 0)}
                            >+</button>
                          </div>
                          {item.quantity >= (item.product?.productQuantity || 0) && (
                            <div className="max-quantity-message">
                              Max quantity reached
                            </div>
                          )}
                        </td>
                        <td className="total-col">
                          ${((item.product?.finalPrice || 0) * (item.quantity || 1)).toFixed(2)}
                        </td>
                        <td className="remove-col border-none bg-none text-red-800  hover:text-red-900 hover:text-2xl transition hover:delay-200 ">
                          <button onClick={() => {
                            // Log the product object to see its structure
                            console.log("Product object:", item.product);
                            // Use _id which is the MongoDB standard ID field
                            handleRemove(item.product?._id);
                          }}>
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr> 
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                        Your cart is empty
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              
              <div className="cart-actions">
                <button className="continue-shopping" onClick={() => window.location.href = "/"}>Continue Shopping</button>
                <button 
                  className="update-cart" 
                  onClick={updateCart}
                  disabled={isUpdating}
                >
                  {isUpdating && <span className="loading-spinner"></span>}
                  {isUpdating ? "Updating..." : "Update Cart"}
                </button>
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
        )}
      </div>
      <Footer />
    </div>
  );
}