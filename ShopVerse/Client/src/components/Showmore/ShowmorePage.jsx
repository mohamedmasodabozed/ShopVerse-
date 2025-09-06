import React, { useState, useEffect } from 'react';
import Header from "../Header"
import Footer from '../Footer/Footer';
import Card from '../FlashSales/Card';

export default function ShowmorePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("authToken");
    const category = sessionStorage.getItem("fromCategory") || "all-products";
    
    // Helper function to get page title based on category
    const getPageTitle = () => {
        switch(category) {
            case "flash-sales":
                return "Flash Sales";
            case "best-selling":
                return "Best Selling Products";
            case "our-products":
                return "Explore Our Products";
            default:
                return "All Products";
        }
    };
    
    // Helper function to get the API filter parameter based on category
    const getFilterParam = (categoryType) => {
        switch(categoryType) {
            case "flash-sales":
                return "flashSales";
            case "best-selling":
                return "bestSellingProducts";
            default:
                return "";
        }
    };

    useEffect(() => {
        setLoading(true);
        
        const filterParam = getFilterParam(category);
        console.log(filterParam);
        const endpoint = filterParam === "" 
            ? "http://localhost:3000/products"
            : `http://localhost:3000/products/getProducts?filter=${filterParam}`;
            
        fetch(endpoint, {
            method: "GET",
            headers: {
                "Authorization": token 
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch products');
            }
            return res.json();
        })
        .then(data => {
            console.log(`${category} products:`, data);
            // Handle different possible response formats
            const productData = data.products || data.Data || data;
            setProducts(Array.isArray(productData) ? productData : []);
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching products:", error);
            setLoading(false);
            setProducts([]);
        });
    }, [category, token]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header isLoggedIn={!!token} />
            
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">{getPageTitle()}</h1>
                    
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-700"></div>
                        </div>
                    ) : (
                        <>
                            {products.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-600 text-lg">No products found</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {products.map((product, index) => (
                                        <Card 
                                            key={product._id || index}
                                            product={product}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            
            <Footer />
        </div>
    );
}
