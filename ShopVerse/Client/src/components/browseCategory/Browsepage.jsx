import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer/Footer';
import Card from '../FlashSales/Card';
export default function BrowsePage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");
  
  // Format the category for display (convert dashes back to spaces, capitalize words)
  const displayCategory = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const normalizeCategory = (str) => {
    if (!str) return "";
    return str.replace(/\u00A0/g, ' ').trim();
  };
  
  console.log(`encoded category: "${encodeURIComponent(displayCategory)}"`);
  console.log(`Raw category from URL: "${category}"`);
  console.log(`Raw displayCategory: "${displayCategory}"`);
  useEffect(() => {
    // Fetch products by category
    setLoading(true);
    fetch(`http://localhost:3000/products/getProducts?category=${displayCategory}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        console.log(encodeURIComponent(displayCategory));
        return res.json();
      })
      .then(data => {
        console.log("Products data:", data);
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [category, displayCategory]);
console.log(products)
  return (
    <div className="bg-gray-50">
      <Header isLoggedIn={!!token} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 pl-4 border-l-4 border-red-500">
          {displayCategory}
        </h1>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-xl font-medium text-gray-800 mb-2">No products found in this category.</p>
            <p className="text-gray-600">Check back later or browse other categories.</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
