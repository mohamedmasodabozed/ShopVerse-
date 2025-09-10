import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer/Footer';
import './Checkout.css';
// Import icons
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaCity, FaGlobe, FaIdCard } from 'react-icons/fa';
import { MdPayment, MdLocalShipping, MdShoppingCart, MdSecurity } from 'react-icons/md';
import { BsFillCreditCardFill, BsPaypal, BsBank, BsCashCoin, BsTags } from 'react-icons/bs';
import { HiOutlineTicket } from 'react-icons/hi';
import { BiChevronRight } from 'react-icons/bi';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { jwtDecode } from 'jwt-decode';

export default function Checkout() {
    const token = localStorage.getItem("authToken");
    const decryptedToken = token ? jwtDecode(token) : {};
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        paymentMethod: 'credit-card',
        cardNumber: '', 
        expiryDate: '', 
        cvv : '',
        couponCode: ''
    });
    
    const navigate = useNavigate();
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Order placed with details:', formData);
        alert('Order placed successfully!');
        navigate('/');
    };
    console.log(formData);
    useEffect(()=>{
        if(decryptedToken)
        {
            fetch(`http://localhost:3000/users/${decryptedToken.id}`,{
                method : 'post' ,
                headers : { Authorization : token} , 
                body : JSON.stringify(formData)
            }).then((res)=>res.json()).then((data)=> console.log(data))
        }

    },[decryptedToken])
    return (
        <div className="checkout-page bg-gray-50">
            <Header isLoggedIn={true} />
            <div className="container mx-auto p-4 py-8">
                <div className="checkout-header text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Secure Checkout</h1>
                    <p className="text-gray-600 mt-2">Complete your purchase securely</p>
                    
                    <div className="flex justify-center items-center space-x-2 mt-4">
                        <div className="flex items-center">
                            <span className="bg-orange-700 text-white w-8 h-8 rounded-full flex items-center justify-center">1</span>
                            <span className="ml-2 font-medium text-orange-700">Cart</span>
                        </div>
                        <BiChevronRight className="text-gray-400 text-xl" />
                        <div className="flex items-center">
                            <span className="bg-orange-700 text-white w-8 h-8 rounded-full flex items-center justify-center">2</span>
                            <span className="ml-2 font-medium text-orange-700">Checkout</span>
                        </div>
                        <BiChevronRight className="text-gray-400 text-xl" />
                        <div className="flex items-center">
                            <span className="bg-gray-300 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center">3</span>
                            <span className="ml-2 text-gray-500">Confirmation</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                    <div className="w-full lg:w-7/12">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="section-header flex items-center mb-6">
                                <MdLocalShipping className="text-2xl text-orange-700 mr-2" />
                                <h2 className="text-xl font-semibold text-gray-800">Shipping Information</h2>
                            </div>
                            
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-group">
                                        <label className="flex items-center text-gray-700 mb-2" htmlFor="firstName">
                                            <FaUser className="text-orange-700 mr-2" />
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                            placeholder="John"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label className="flex items-center text-gray-700 mb-2" htmlFor="lastName">
                                            <FaUser className="text-orange-700 mr-2" />
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                            placeholder="Doe"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="form-group">
                                    <label className="flex items-center text-gray-700 mb-2" htmlFor="email">
                                        <FaEnvelope className="text-orange-700 mr-2" />
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label className="flex items-center text-gray-700 mb-2" htmlFor="address">
                                        <FaMapMarkerAlt className="text-orange-700 mr-2" />
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                        placeholder="123 Main Street"
                                        required
                                    />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="form-group">
                                        <label className="flex items-center text-gray-700 mb-2" htmlFor="city">
                                            <FaCity className="text-orange-700 mr-2" />
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                            placeholder="New York"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label className="flex items-center text-gray-700 mb-2" htmlFor="state">
                                            <FaMapMarkerAlt className="text-orange-700 mr-2" />
                                            State/Province
                                        </label>
                                        <input
                                            type="text"
                                            id="state"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                            placeholder="NY"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label className="flex items-center text-gray-700 mb-2" htmlFor="zipCode">
                                            <FaIdCard className="text-orange-700 mr-2" />
                                            Zip/Postal Code
                                        </label>
                                        <input
                                            type="text"
                                            id="zipCode"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                            placeholder="10001"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="form-group">
                                    <label className="flex items-center text-gray-700 mb-2" htmlFor="country">
                                        <FaGlobe className="text-orange-700 mr-2" />
                                        Country
                                    </label>
                                    <select
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                        required
                                    >
                                        <option value="United States">United States</option>
                                        <option value="Canada">Canada</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Germany">Germany</option>
                                        <option value="France">France</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                            <div className="section-header flex items-center mb-6">
                                <MdPayment className="text-2xl text-orange-700 mr-2" />
                                <h2 className="text-xl font-semibold text-gray-800">Payment Method</h2>
                            </div>
                            
                            <div className="payment-options space-y-4">
                                <div className="payment-option p-4 border border-gray-200 rounded-md hover:border-orange-500 transition-all cursor-pointer flex items-center">
                                    <input
                                        type="radio"
                                        id="credit-card"
                                        name="paymentMethod"
                                        value="credit-card"
                                        checked={formData.paymentMethod === 'credit-card'}
                                        onChange={handleInputChange}
                                        className="mr-3"
                                    />
                                    <label htmlFor="credit-card" className="flex items-center cursor-pointer w-full">
                                        <BsFillCreditCardFill className="text-orange-700 text-xl mr-2" />
                                        <span>Credit Card</span>
                                        <div className="ml-auto flex space-x-2">
                                            <img src="https://cdn-icons-png.flaticon.com/128/196/196578.png" alt="Visa" className="h-6" />
                                            <img src="https://cdn-icons-png.flaticon.com/128/196/196561.png" alt="MasterCard" className="h-6" />
                                            <img src="https://cdn-icons-png.flaticon.com/128/196/196539.png" alt="Amex" className="h-6" />
                                        </div>
                                    </label>
                                </div>
                                
                                {/* <div className="payment-option p-4 border border-gray-200 rounded-md hover:border-orange-500 transition-all cursor-pointer flex items-center">
                                    <input
                                        type="radio"
                                        id="paypal"
                                        name="paymentMethod"
                                        value="paypal"
                                        checked={formData.paymentMethod === 'paypal'}
                                        onChange={handleInputChange}
                                        className="mr-3"
                                    />
                                    <label htmlFor="paypal" className="flex items-center cursor-pointer">
                                        <BsPaypal className="text-blue-600 text-xl mr-2" />
                                        <span>PayPal</span>
                                    </label>
                                </div> */}
                                
                                {/* <div className="payment-option p-4 border border-gray-200 rounded-md hover:border-orange-500 transition-all cursor-pointer flex items-center">
                                    <input
                                        type="radio"
                                        id="bank-transfer"
                                        name="paymentMethod"
                                        value="bank-transfer"
                                        checked={formData.paymentMethod === 'bank-transfer'}
                                        onChange={handleInputChange}
                                        className="mr-3"
                                    />
                                    <label htmlFor="bank-transfer" className="flex items-center cursor-pointer">
                                        <BsBank className="text-green-600 text-xl mr-2" />
                                        <span>Bank Transfer</span>
                                    </label>
                                </div> */} 
                                
                                <div className="payment-option p-4 border border-gray-200 rounded-md hover:border-orange-500 transition-all cursor-pointer flex items-center">
                                    <input
                                        type="radio"
                                        id="cash-on-delivery"
                                        name="paymentMethod"
                                        value="cash-on-delivery"
                                        checked={formData.paymentMethod === 'cash-on-delivery'}
                                        onChange={handleInputChange}
                                        className="mr-3"
                                    />
                                    <label htmlFor="cash-on-delivery" className="flex items-center cursor-pointer">
                                        <BsCashCoin className="text-yellow-600 text-xl mr-2" />
                                        <span>Cash on Delivery</span>
                                    </label>
                                </div>
                                {formData.paymentMethod === 'credit-card' && (
                                    <div className="credit-card-info mt-6 space-y-4">
                                        <div className="form-group">
                                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                                            <input
                                                type="text"
                                                id="cardNumber"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                                                placeholder="1234 5678 9012 3456"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                                            <input
                                                type="date"
                                                id="expiryDate"
                                                name="expiryDate"
                                                value={formData.expiryDate}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                                                placeholder="MM/YY"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                                            <input
                                                type="text"
                                                id="cvv"
                                                name="cvv"
                                                value={formData.cvv}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                                                placeholder="123"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="mt-6 flex justify-center">
                                <div className="security-badge flex items-center text-gray-600 text-sm border border-gray-200 rounded-md px-3 py-2">
                                    <RiSecurePaymentLine className="text-green-600 mr-2 text-xl" />
                                    <span>All transactions are secure and encrypted</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-6 flex justify-center">
                            <button 
                                type="submit"
                                onClick={handleSubmit}
                                className="bg-orange-700 text-white py-3 px-8 rounded-md font-semibold hover:bg-orange-600 transition-all shadow-lg flex items-center"
                            >
                                <MdSecurity className="mr-2 text-xl" />
                                Complete Order
                            </button>
                        </div>
                        
                    </div> 
                    
                    {/* Right Section - Cart Summary */}
                    <div className="w-full lg:w-4/12">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="section-header flex items-center mb-6">
                                <MdShoppingCart className="text-2xl text-orange-700 mr-2" />
                                <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
                            </div>
                            
                            <div className="product-list space-y-4 mb-6">
                                <div className="product-item flex justify-between items-center border-b pb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden">
                                            <img src="https://via.placeholder.com/64" alt="Product" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">Wireless Headphones</h3>
                                            <p className="text-sm text-gray-600">Qty: 1</p>
                                        </div>
                                    </div>
                                    <span className="font-medium text-gray-800">$59.99</span>
                                </div>
                                
                                <div className="product-item flex justify-between items-center border-b pb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden">
                                            <img src="https://via.placeholder.com/64" alt="Product" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">Smart Watch</h3>
                                            <p className="text-sm text-gray-600">Qty: 2</p>
                                        </div>
                                    </div>
                                    <span className="font-medium text-gray-800">$79.98</span>
                                </div>
                            </div>
                            
                            <div className="coupon-section mb-6">
                                <div className="flex items-center mb-3">
                                    <HiOutlineTicket className="text-xl text-orange-700 mr-2" />
                                    <h3 className="font-semibold text-gray-800">Apply Coupon</h3>
                                </div>
                                <div className="flex">
                                    <input 
                                        type="text" 
                                        name="couponCode"
                                        value={formData.couponCode}
                                        onChange={handleInputChange}
                                        placeholder="Enter coupon code" 
                                        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                    />
                                    <button 
                                        className="bg-orange-700 text-white px-4 py-2 rounded-r-md hover:bg-orange-600 transition-all flex items-center"
                                        onClick={() => alert('Coupon applied!')}
                                    >
                                        <BsTags className="mr-1" />
                                        Apply
                                    </button>
                                </div>
                            </div>
                            
                            <div className="summary-totals space-y-3 mb-6">
                                <div className="flex justify-between py-2">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium text-gray-800">$139.97</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium text-gray-800">$10.00</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="font-medium text-gray-800">$14.00</span>
                                </div>
                                <div className="flex justify-between py-3 border-t border-gray-200 mt-2">
                                    <span className="font-bold text-gray-800">Total</span>
                                    <span className="font-bold text-xl text-orange-700">$163.97</span>
                                </div>
                            </div>
                            
                            <div className="order-actions">
                                <button 
                                    className="w-full bg-orange-700 text-white py-3 px-4 rounded-md font-semibold hover:bg-orange-600 transition-all shadow-md flex items-center justify-center"
                                    onClick={handleSubmit}
                                >
                                    <MdSecurity className="mr-2" />
                                    Place Order
                                </button>
                                
                                <button 
                                    className="w-full mt-3 bg-gray-100 text-gray-700 py-3 px-4 rounded-md font-medium hover:bg-gray-200 transition-all flex items-center justify-center"
                                    onClick={() => navigate('/cart')}
                                >
                                    <MdShoppingCart className="mr-2" />
                                    Return to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}