
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, data } from 'react-router-dom'
// Route guard for pages only for guests (not logged in)
function GuestRoute({ isLoggedIn, children }) {
    return isLoggedIn ? <Navigate to="/profile" replace /> : children;
}

// Route guard for pages only for authenticated users
function PrivateRoute({ isLoggedIn, children }) {
    return isLoggedIn ? children : <Navigate to="/login" replace />;
}
import './App.css'
import Header from './components/Header.jsx'
import Advertisement from './components/Advirtise/Advertisement.jsx'
import FlashSales from './components/FlashSales/FlashSales.jsx'
import Categories from './components/Categories/Categories.jsx'
import BestSellers from './components/BestSellers/BestSellers.jsx'
import Advertise from './components/BestSellers/Advertise.jsx'
import Separator from './components/FlashSales/Seprator.jsx'
import NewArrival from './components/NewArrival/NewArrival.jsx'
import Footer from './components/Footer/Footer.jsx'
import SignUp from './components/Auth/SignUp'
import Login from './components/Auth/Login'
import Logout from './components/Auth/Logout'
import ForgotPassword from './components/Auth/ForgotPassword'
import Profile  from "./components/Profile/Profile.jsx"
import SellingProducts from './components/Profile/sellingProducts.jsx';
import Maincart from './components/Cart/mainCart.jsx';
import { useState } from 'react';
// Home component that contains all the main page content

function Home({isLoggedIn}) {
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem("authToken");
    // Flash Sales products data
    const flashSalesProducts = [
        {
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
            title: "Running Shoes",
            description: "Premium quality running shoes for athletes",
            price: "$89.99",
            rating: 4,
            discountPercentage: 25
        },
        {
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
            title: "Smart Watch",
            description: "Advanced fitness tracking smartwatch",
            price: "$199.99",
            rating: 5,
            discountPercentage: 30
        },
        {
            image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop",
            title: "Sunglasses",
            description: "UV protection designer sunglasses",
            price: "$45.99",
            rating: 4,
            discountPercentage: 15
        },
        {
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
            title: "Travel Backpack",
            description: "Durable travel and hiking backpack",
            price: "$79.99",
            rating: 5,
            discountPercentage: 40
        }
    ];

    // Best Sellers products data
    const bestSellersProducts = [
        {
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
            title: "Wireless Headphones",
            description: "Premium noise-canceling headphones",
            price: "$149.99",
            rating: 5,
            discountPercentage: 20
        },
        {
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop",
            title: "Gaming Keyboard",
            description: "Mechanical RGB gaming keyboard",
            price: "$129.99",
            rating: 4,
            discountPercentage: 10
        },
        {
            image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop",
            title: "Coffee Maker",
            description: "Automatic drip coffee maker",
            price: "$89.99",
            rating: 4,
            discountPercentage: 5
        },
        {
            image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=300&h=300&fit=crop",
            title: "Leather Wallet",
            description: "Genuine leather bifold wallet",
            price: "$39.99",
            rating: 5,
            discountPercentage: 12
        }
    ];

    // Our Products - Explore Our Products section
    const ourProducts = [
        {
            image: "https://images.unsplash.com/photo-1588200908342-23b585c03e26?w=300&h=300&fit=crop",
            title: "Wireless Mouse",
            description: "Ergonomic wireless mouse with RGB lighting",
            price: "$29.99",
            rating: 4,
            discountPercentage: 8
        },
        {
            image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop",
            title: "Bluetooth Speaker",
            description: "Portable waterproof Bluetooth speaker",
            price: "$69.99",
            rating: 5,
            discountPercentage: 18
        },
        {
            image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=300&fit=crop",
            title: "USB-C Hub",
            description: "7-in-1 USB-C hub with multiple ports",
            price: "$49.99",
            rating: 4,
            discountPercentage: 12
        },
        {
            image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop",
            title: "Phone Case",
            description: "Shockproof phone case with card holder",
            price: "$19.99",
            rating: 4,
            discountPercentage: 25
        },
        {
            image: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=300&h=300&fit=crop",
            title: "Desk Lamp",
            description: "LED desk lamp with adjustable brightness",
            price: "$34.99",
            rating: 5,
            discountPercentage: 15
        },
        {
            image: "https://images.unsplash.com/photo-1582747652673-603191769491?w=300&h=300&fit=crop",
            title: "Water Bottle",
            description: "Insulated stainless steel water bottle",
            price: "$24.99",
            rating: 4,
            discountPercentage: 10
        },
        {
            image: "https://images.unsplash.com/photo-1572635196243-4dd75fbdbd7f?w=300&h=300&fit=crop",
            title: "Wireless Charger",
            description: "Fast wireless charging pad for smartphones",
            price: "$39.99",
            rating: 4,
            discountPercentage: 20
        },
        {
            image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=300&h=300&fit=crop",
            title: "Laptop Stand",
            description: "Adjustable aluminum laptop stand",
            price: "$54.99",
            rating: 5,
            discountPercentage: 14
        }
    ];
    useEffect(()=>{
                if (token) {
                    fetch("http://localhost:3000/products", {
                        method: "GET",
                        headers: {
                            Authorization: token
                        }
                    })
                    .then((data) => data.json())
                    .then((products) => {
                        setProducts(products);
                    });
                }
            }, [token]);
    console.log(products);
    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <Advertisement />
            <FlashSales 
                text="Today's" 
                show={true} 
                products={flashSalesProducts} 
            />
            <Separator />
            <Categories />
            <BestSellers products={bestSellersProducts} />
            <Advertise img="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&h=400&fit=crop" />
            <FlashSales 
                text="our products" 
                show={false} 
                products={products} 
            />
            <Separator />
            <NewArrival />
            <Footer />
        </>
    )
}

function App() {
        const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
                // Check localStorage for auth token on initial load
                return !!localStorage.getItem('authToken');
        });

        // Keep isLoggedIn in sync with localStorage (for login/logout)
        React.useEffect(() => {
                const handleStorage = () => {
                        setIsLoggedIn(!!localStorage.getItem('authToken'));
                };
                window.addEventListener('storage', handleStorage);
                return () => window.removeEventListener('storage', handleStorage);
        }, []);

        return (
                <Router>
                        <Routes>
                                <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                                <Route path="/signup" element={
                                    <GuestRoute isLoggedIn={isLoggedIn}>
                                        <SignUp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                                    </GuestRoute>
                                } />
                                <Route path="/login" element={
                                    <GuestRoute isLoggedIn={isLoggedIn}>
                                        <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                                    </GuestRoute>
                                } />
                                <Route path="/forgot-password" element={<ForgotPassword />} />
                                <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
                                <Route path="/profile" element={
                                    <PrivateRoute isLoggedIn={isLoggedIn}>
                                        <Profile isLoggedIn={isLoggedIn} />
                                    </PrivateRoute>
                                } />
                                <Route path="/selling-products" element={
                                    <PrivateRoute isLoggedIn={isLoggedIn}>
                                        <SellingProducts isLoggedIn={isLoggedIn} />
                                    </PrivateRoute>
                                } />
                                <Route path="/cart" element={<Maincart />} />
                        </Routes>
                </Router>
        )
}

export default App
