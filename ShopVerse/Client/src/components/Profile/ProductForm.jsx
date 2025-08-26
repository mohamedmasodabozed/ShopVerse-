import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {jwtDecode} from "jwt-decode";

const categories = [
  "Woman's Fashion",
  "Men's Fashion",
  "Electronics",
  "Home Appliances",
  "Medicine",
  "Sports & Outdoor",
  "Baby's & Toys",
  "Groceries & Pets",
  "Health & Beauty"
];

export default function ProductForm({ isLoggedIn, onClose, onProductAdded }) {
    const [image, setImage] = useState(null);
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productCategory, setProductCategory] = useState(categories[0]);
    const [productPrice, setProductPrice] = useState("");
    const [productDiscount, setProductDiscount] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [productAdded , setProductAdded] = useState(false);
    let token = localStorage.getItem("authToken");
    let decryptedToken = token ? jwtDecode(token) : {};
    function showPopup(message) {
        setTimeout(() => {
            return (<h1>{message}</h1>)
        } , 3000)
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        if (image) {
            formData.append('productImage', image);
        }
        formData.append('productName', productName);
        formData.append('productDescription', productDescription);
        formData.append('productCategory', productCategory);
        formData.append('productPrice', productPrice);
        formData.append('productDiscount', productDiscount);
        formData.append('productQuantity', productQuantity);
        fetch("http://localhost:3000/products", {
            method: "POST",
            body: formData,
            headers: {
                Authorization: token,
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
            if (onProductAdded) onProductAdded();
            if (onClose) onClose();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
        showPopup("Product added successfully!");
        setProductAdded(true);
    }
    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles && acceptedFiles[0]) {
            setImage(Object.assign(acceptedFiles[0], {
                preview: URL.createObjectURL(acceptedFiles[0])
            }));
        }
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    });

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <div {...getRootProps()} className="dropzone" style={{border: '2px dashed #DB4444', borderRadius: 8, padding: 20, textAlign: 'center', marginBottom: 16, background: isDragActive ? '#ffeaea' : '#fafafa', cursor: 'pointer'}}>
                <input {...getInputProps()} />
                {image ? (
                    <img src={image.preview} alt="Preview" style={{maxWidth: 120, maxHeight: 120, margin: '0 auto', display: 'block', borderRadius: 8}} />
                ) : (
                    <p>Drag & drop product image here, or click to select</p>
                )}
            </div>
            <input type="text" placeholder="Product Name" value={productName} onChange={e => setProductName(e.target.value)} required />
            <input type="text" placeholder="Product Description" value={productDescription} onChange={e => setProductDescription(e.target.value)} required />
            <select value={productCategory} onChange={e => setProductCategory(e.target.value)} required>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <input type="number" placeholder="Product Price" value={productPrice} onChange={e => setProductPrice(e.target.value)} required />
            <input type="number" placeholder="Discount Percentage" value={productDiscount} onChange={e => setProductDiscount(e.target.value)} min="0" max="100" />
            <input type="number" placeholder="Quantity" value={productQuantity} onChange={e => setProductQuantity(e.target.value)} required />
            <button type="submit">Add Product</button>
        </form>
    );
}