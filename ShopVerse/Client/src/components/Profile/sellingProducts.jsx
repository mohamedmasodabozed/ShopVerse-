import NavList from "./NavList";
import Card from "../FlashSales/Card";
import Header from "../Header";
import "./sellingProducts.css";
import mockImage from "../../assets/istockphoto-1409329028-1024x1024.jpg"
export default function SellingProducts() {
    let token = localStorage.getItem("authToken");
    let role = "";
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
    function handleSubmit(event) {
        event.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted");
    }
    function showForm() {
        // Show form logic here
        console.log("Show form");
    }
    return (
        <div>
            <Header />
            <div className="seller-products-container">
                <NavList role={role} />
                <div className="seller-main">
                    <div className="seller-title">Your Products</div>
                    <div className="addCard" onClick={showForm}>
                        <span>Add Your Products</span>
                        <span>+</span>
                    </div>
                    <div className="current-products" onSubmit={handleSubmit}>
                        <Card  image={mockImage}
                                title={title}
                                description={description}
                                price={price}
                                rating={rating}
                                discountPercentage={discountPercentage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
