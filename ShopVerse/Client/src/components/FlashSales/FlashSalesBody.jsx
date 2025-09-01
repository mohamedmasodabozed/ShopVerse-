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

    return (
        <div className="flash-sales-body">
            <div className="flash-sales-cards">
                {products.map((product, index) => (
                    <Card 
                        key={index}
                        id={product.id || `flash-product-${index}`}  // Add a unique ID for each product
                        image={product.image}
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        rating={product.rating}
                        discountPercentage={product.discountPercentage}
                    />
                ))}
            </div>
        </div>
    );
}