import Card from "./Card.jsx";

export default function FlashSalesBody(props)
{
    // Default products if no props are passed
    const defaultProducts = [
        {
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
            title: "Running Shoes",
            description: "Premium quality running shoes for athletes",
            price: "$89.99",
            rating: 2,
            discountPercentage: 10
        },
        {
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
            title: "Smart Watch",
            description: "Advanced fitness tracking smartwatch",
            price: "$199.99",
            rating: 4,
            discountPercentage: 15
        },
        {
            image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop",
            title: "Sunglasses",
            description: "UV protection designer sunglasses",
            price: "$45.99",
            rating: 3,
            discountPercentage: 5
        },
        {
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
            title: "Backpack",
            description: "Durable travel and hiking backpack",
            price: "$79.99",
            rating: 5,
            discountPercentage: 20
        }
    ];

    // Use props.products if available, otherwise use default products
    const products = props.products || defaultProducts;
    const productsToDisplay = products.slice(0, 6); 
    return (
        <div className="flash-sales-body">
            <div className="flash-sales-cards">
                {productsToDisplay.map((product, index) => {
                    // Check if we're dealing with the API format or the default format
                    const isApiFormat = product._id !== undefined;
                    
                    return (
                        <Card 
                            key={isApiFormat ? product._id : index}
                            id={isApiFormat ? product._id : `flash-product-${index}`}
                            image={isApiFormat ? (product.productImage?.URL || "https://via.placeholder.com/300") : product.image}
                            title={isApiFormat ? product.productName : product.title}
                            description={isApiFormat ? product.productDescription : product.description}
                            price={isApiFormat ? `$${product.finalPrice.toFixed(2)}` : product.price}
                            rating={isApiFormat ? 4 : product.rating} // Default rating if not provided
                            discountPercentage={isApiFormat ? product.flashSales : product.discountPercentage}
                            _id={isApiFormat ? product._id : null}
                        />
                    );
                })}
            </div>
        </div>
    );
}