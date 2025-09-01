import NavList from "./NavList";
import Card from "../FlashSales/Card";
import Header from "../Header";
import "./sellingProducts.css";
import mockImage from "../../assets/istockphoto-1409329028-1024x1024.jpg"
import ProductForm from "./ProductForm";
import { useEffect, useState, useCallback } from "react";

export default function SellingProducts({ isLoggedIn }) {
    let token = localStorage.getItem("authToken");
    let role = "";
    const [products, setProducts] = useState([]);
    const [shown, setShown] = useState(false);
    if (token) {
        try {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            role = decoded.role;
        } catch (e) {
            role = "";
        }
    }

    const [activeLink, setActiveLink] = useState('selling-products');

    const fetchProducts = useCallback(() => {
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

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);
    
    return (
        <div>
            <Header isLoggedIn={!!token} />
            <div className="seller-products-container">
                <NavList role={role} activeLink={activeLink} setActiveLink={setActiveLink} />
                <div className="seller-main">
                    <div className="seller-title">Your Products</div>
                    <div className="addCard" onClick={() => setShown(!shown)}>
                        <span>Add Your Products</span>
                        <span>+</span>
                    </div>
                    <div className="current-products">
                        {console.log(`products:${(products)}`)}
                        {products.map((product) => (
                            console.log(`product this is product pig:${JSON.stringify(product)}`),
                            <Card
                                key={product._id}
                                id={product._id}
                                image={product.productImage.URL || mockImage}
                                title={product.productName}
                                description={product.productDescription}
                                price={product.productPrice}
                                rating={product.productRating}
                                discountPercentage={product.productDiscount}
                            />
                        ))}
                        {shown ? <ProductForm isLoggedIn={isLoggedIn} onClose={() => setShown(false)} onProductAdded={fetchProducts} /> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
