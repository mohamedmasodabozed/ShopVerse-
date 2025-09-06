import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer/Footer';
import './showDerails.css';

export default function ShowDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState(2); // Default to M (middle option)
    const [popupMessage, setPopupMessage] = useState("");
    const [features, setFeatures] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [reviews , setReviews] = useState(false);
    const [shipping , setShipping] = useState(false);
    const [featuresList , setFeaturesList] = useState([]);
    const token = localStorage.getItem("authToken");
    
    const handleAddToCart = () => {
        
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
                setPopupMessage(`${product.productName} added to your cart!`);
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
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3000/products/${productId}`, {
            method: "GET", 
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch product details');
                }
                return res.json();
            })
            .then(data => {
                console.log("Product details:", data);
                setProduct(data.Data || data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching product details:", error);
                setLoading(false);
            });
    }, [productId, token]);
        console.log(`product details page product:${JSON.stringify(product)}`);
    return (
        <div className="bg-gray-50 min-h-screen">
            <Header isLoggedIn={!!token} />
            
            {/* Popup message */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-30" onClick={() => setShowPopup(false)}></div>
                    <div className="bg-white p-6 rounded-lg shadow-xl z-10 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Notification</h3>
                            <button 
                                onClick={() => setShowPopup(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-gray-600">{popupMessage}</p>
                        <div className="mt-6">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="w-full py-2 px-4 bg-orange-600 text-white rounded hover:bg-orange-700"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-700"></div>
                </div>
            ) : (
                <div className="container mx-auto px-4 py-8">
                    <div className="product-details-container bg-white rounded-lg shadow-lg overflow-hidden">
                        {/* Breadcrumb */}
                        <div className="px-6 py-3 bg-gray-100">
                            <p className="text-sm text-gray-600">
                                Home / Products / {product?.category || "Category"} / {product?.productName || product?.title || "Product"}
                            </p>
                        </div>
                        
                        {/* Product Content */}
                        <div className="lg:flex block">
                            {/* Product Image Section */}
                            <div className="lg:w-1/2 w-full p-6">
                                <div className="relative pb-[100%] overflow-hidden rounded-lg bg-gray-100">
                                    <img 
                                        src={product?.productImage?.URL || "https://via.placeholder.com/600"} 
                                        alt={product?.productName || "Product"} 
                                        className="absolute inset-0 w-full h-full object-contain"
                                    />
                                </div>
                                
                                {/* Thumbnails - can be expanded in the future */}
                                <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
                                    <div className="w-20 h-20 border rounded-md flex-shrink-0 cursor-pointer overflow-hidden">
                                        <img 
                                            src={product?.productImage?.URL || "https://via.placeholder.com/150"} 
                                            alt="Thumbnail" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Product Details Section */}
                            <div className="lg:w-1/2 w-full p-6">
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                    {product?.productName || product?.title || "Product Name"}
                                </h1>
                                
                                {/* Ratings */}
                                <div className="flex items-center mb-4">
                                    <div className="flex text-yellow-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                    <span className="ml-2 text-gray-600">(121 Reviews)</span>
                                </div>
                                
                                {/* Price */}
                                <div className="mb-6">
                                    <p className="text-3xl font-bold text-orange-700">
                                        ${product?.productPrice || product?.price || "0.00"}
                                    </p>
                                    {product?.oldPrice && (
                                        <p className="text-gray-500 line-through">
                                            ${product.oldPrice}
                                        </p>
                                    )}
                                </div>
                                
                                {/* Description */}
                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
                                    <p className="text-gray-600">
                                        {product?.productDescription || product?.description || "No description available."}
                                    </p>
                                </div>
                                
                                <div className="border-t border-b py-4 my-6">
                                    {/* Colors */}
                                    <div className="mb-4">
                                        <h2 className="text-sm font-medium text-gray-700 mb-2">Colors</h2>
                                        <div className="flex space-x-2">
                                            {['red-600', 'blue-600', 'green-600', 'yellow-500'].map((color, index) => (
                                                <button 
                                                    key={index}
                                                    className={`w-8 h-8 rounded-full bg-${color} ${selectedColor === index ? 'ring-2 ring-offset-1 ring-' + color : ''}`}
                                                    onClick={() => setSelectedColor(index)}
                                                ></button>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Sizes */}
                                    <div>
                                        <h2 className="text-sm font-medium text-gray-700 mb-2">Size</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {['XS', 'S', 'M', 'L', 'XL'].map((size, index) => (
                                                <button 
                                                    key={index}
                                                    className={`px-3 py-1 border ${selectedSize === index 
                                                        ? 'border-orange-700 text-orange-700 font-medium' 
                                                        : 'border-gray-300 text-gray-700 hover:border-orange-700 hover:text-orange-700'} 
                                                        rounded-md transition-all`}
                                                    onClick={() => setSelectedSize(index)}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Quantity and Add to Cart */}
                                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                    <div className="flex items-center border border-gray-300 rounded-md">
                                        <button 
                                            className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                                            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                            </svg>
                                        </button>
                                        <input 
                                            type="text" 
                                            className="w-12 text-center border-x border-gray-300 py-2"
                                            value={quantity}
                                            readOnly
                                        />
                                        <button 
                                            className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                                            onClick={() => setQuantity(prev => prev + 1)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>
                                    
                                    <button 
                                        className="add-to-cart-button w-full sm:w-auto py-3 px-8 flex items-center justify-center text-white rounded-md shadow-md hover:bg-red-600 transition-colors"
                                        onClick={() => {
                                            handleAddToCart();
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Add to Cart
                                    </button>
                                    
                                    <button 
                                        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                                        onClick={() => alert("Added to wishlist!")}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                </div>
                                
                                {/* Additional Info */}
                                <div className="mt-8">
                                    <div className="flex items-center text-sm text-gray-600 mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Free shipping for orders over $50
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        30-day easy returns
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Product Details Tabs - can be expanded in the future */}
                    <div className="bg-white rounded-lg shadow-lg mt-8 p-6">
                        <div className="border-b border-gray-200">
                            <div className="flex -mb-px">
                                <button className={`${features ? "text-orange-700 border-b-2 border-orange-700" : "text-gray-600"} py-4 px-6 font-medium`} onClick={() => setFeatures(true) || setReviews(false) || setShipping(false)}>
                                    Details
                                </button>
                                <button className={`${reviews ? "text-orange-700 border-b-2 border-orange-700" : "text-gray-600"} py-4 px-6 font-medium`} onClick={() => setReviews(true) || setFeatures(false) || setShipping(false)}>
                                    Reviews
                                </button>
                                <button className={`${shipping ? "text-orange-700 border-b-2 border-orange-700" : "text-gray-600"} py-4 px-6 font-medium`} onClick={() => setShipping(true) || setFeatures(false) || setReviews(false)}>
                                    Shipping
                                </button>
                            </div>
                        </div>
                        
                        <div className="py-6">
                            <p className="text-gray-600 mb-4">
                                {product?.productDescription || product?.description || "No description available."}
                            </p>

                            <h3 className="font-medium text-gray-800 mb-2">{features && "Features:"}{reviews && "Reviews:"}{shipping && "Shipping:"}</h3>
                            {features && <ul className="list-disc pl-5 text-gray-600 space-y-1">
                                {featuresList.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>}
            
                        </div>
                    </div>
                </div>
            )}
            
            <Footer />
        </div>
    );
}