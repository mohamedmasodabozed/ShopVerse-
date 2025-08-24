import NavList from "./NavList";
import Card from "../FlashSales/Card";
import Header from "../Header";
import "./sellingProducts.css";
import mockImage from "../../assets/istockphoto-1409329028-1024x1024.jpg"
import ProductForm from "./ProductForm";
import { useState } from "react";
export default function SellingProducts({ isLoggedIn }) {
    let token = localStorage.getItem("authToken");
    let role = "";
    const [shown, setShown] = useState(false);
    if (token) {
        try {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            role = decoded.role;
        } catch (e) {
            role = "";
        }
    }
    let image = "https://i.dummyjson.com/data/products/1/thumbnail.jpg"; 
    let title = "Product Title";
    let description = "Product Description";
    let price = 100;
    let rating = 4.5;
    let discountPercentage = 10;
    function showForm() {
        console.log("Show form");

    }
    const [activeLink, setActiveLink] = useState('selling-products');
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
                        <Card  image={mockImage}
                                title={title}
                                description={description}
                                price={price}
                                rating={rating}
                                discountPercentage={discountPercentage}
                        />
                        {shown ? <ProductForm isLoggedIn={isLoggedIn} onClose={() => setShown(false)} /> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
