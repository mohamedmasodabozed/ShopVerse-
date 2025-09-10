import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {jwtDecode} from "jwt-decode";
import { useRef } from "react";

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
export default function ProductForm({ isLoggedIn, onClose, onProductAdded}) {
    const [image, setImage] = useState(null);
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productCategory, setProductCategory] = useState(categories[0]);
    const [productPrice, setProductPrice] = useState("");
    const [productDiscount, setProductDiscount] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [productAdded , setProductAdded] = useState(false);
    const [productSubCategory, setProductSubCategory] = useState(""); 
    const [productInfo, setProductInfo] = useState([{}]);
    const [variantItems , setVariantItems] = useState([]);
    const [size , setSize] = useState("");
    const [color , setColor] = useState("");
    const [quantity , setQuantity] = useState("");
    const lastActionRef = useRef(null);
    const sizeThing = productCategory === "Woman's Fashion" || productCategory === "Men's Fashion" ? setProductCategory("Clothing") : null;
    const sizes = {
        [productCategory || "Clothing"]: ["XS", "S", "M", "L", "XL", "XXL"],
        "Footwear": ["5", "6", "7", "8", "9", "10"],
        "Accessories": ["One Size"],
        "Electronics": ["Small", "Medium", "Large"],
        "Home Appliances": ["Compact", "Standard", "Large"],
        "Medicine": ["Adult", "Child"],
        "Sports & Outdoor": ["Small", "Medium", "Large"],
        "Toys": ["Small", "Medium", "Large"], 
        "Gear": ["Small", "Medium", "Large"],
        "Groceries & Pets": ["Small", "Medium", "Large"],
        "Health & Beauty": ["Small", "Medium", "Large"]
    }
    const subcategories = {
        "Electronics": ["Mobile Phones", "Laptops", "Cameras" , "Televisions", "Audio Equipment"],
        "Baby's & Toys": ["Clothing", "Toys", "Gear"],
        "Sports & Outdoor": ["Clothing", "rackets", "ball" , "bag" , "other"],
    };
    //const sizes = ["XS", "S", "M", "L", "XL", "XXL"]; 
    const colors = ["Red", "Blue", "Green", "Black", "White", "Yellow", "Purple", "Orange", "Pink", "Gray", "Brown"];
    let token = localStorage.getItem("authToken");
    let decryptedToken = token ? jwtDecode(token) : {};
    function showPopup(message) {
        setTimeout(() => {
            return (<h1>{message}</h1>)
        } , 3000)
    }

function handleAddVariant(e) {
  if (e && e.preventDefault) e.preventDefault();

  // optional: see where it's coming from when debugging
  console.trace("handleAddVariant called");


  setVariantItems((prev) => {
    const qtyToAdd = parseInt(quantity, 10) || 0;
    const newId = Date.now();

    const existingCategoryIndex = prev.findIndex(
      (item) => item.type === productCategory
    );

    if (existingCategoryIndex !== -1) {
      // deep-copy category and sizes array
      const original = prev[existingCategoryIndex];
      const updatedCategory = {
        ...original,
        sizes: Array.isArray(original.sizes) ? [...original.sizes] : [],
      };

      const sizeIndex = updatedCategory.sizes.findIndex((s) => s.size === size);

      if (sizeIndex !== -1) {
        // copy that size and its colors array
        const sizeObj = {
          ...updatedCategory.sizes[sizeIndex],
          colors: Array.isArray(updatedCategory.sizes[sizeIndex].colors)
            ? [...updatedCategory.sizes[sizeIndex].colors]
            : [],
        };

        const colorIndex = sizeObj.colors.findIndex((c) => c.colorName === color);

        if (colorIndex !== -1) {
          const currentQty = parseInt(sizeObj.colors[colorIndex].quantity, 10) || 0;
          sizeObj.colors[colorIndex] = {
            ...sizeObj.colors[colorIndex],
            quantity: currentQty + qtyToAdd,
          };
        } else {
          // add new color
          sizeObj.colors.push({ colorName: color, quantity: qtyToAdd });
        }

        // put sizeObj back
        updatedCategory.sizes[sizeIndex] = sizeObj;
      } else {
        // add new size with color
        updatedCategory.sizes.push({
          size,
          colors: [{ colorName: color, quantity: qtyToAdd }],
        });
      }

      const newArray = [...prev];
      newArray[existingCategoryIndex] = updatedCategory;
      return newArray;
    } else {
      // add brand new category
      return [
        ...prev,
        {
          id: newId,
          type: productCategory,
          sizes: [
            {
              size,
              colors: [{ colorName: color, quantity: qtyToAdd }],
            },
          ],
        },
      ];
    }
  });
}

    console.log(variantItems);
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
        formData.append('variantItems', JSON.stringify(variantItems));
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
    const handleRemoveVariant =(id)=>{
        const updatedVariants = variantItems.filter(var1=> var1.id !== id);
        setVariantItems(updatedVariants);
    }
    // setProducts([...products , variantItems]);
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
            {subcategories[productCategory] && <select value={productSubCategory} onChange={e => setProductSubCategory(e.target.value)} required>
                <option value="">Select Subcategory</option>
                {subcategories[productCategory]?.map(subcat => (
                    <option key={subcat} value={subcat}>{subcat}</option>
                ))}
            </select>
            }
            {
            <div>
                <form className='Add-variant-form'>
                    <h4>Product Variants</h4>
                    <select aria-label="Size" title="Select size for this variant" onChange={e =>  setSize(e.target.value)}>
                        <option value="">Select Size</option>
                        {sizes[productCategory]?.map(size => (
                            <option key={size} value={size} >{size}</option>
                        ))}
                        
                    </select>
                    <select aria-label="Color" title="Select color for this variant" onChange={e => setColor(e.target.value)}>
                        <option value="">Select Color</option>
                        {colors.map((color) => (
                            <option key={color} value={color}>{color}</option>
                        ))}
                    </select>
                    <input type="number" placeholder="Quantity" min="1" aria-label="Quantity" title="Enter quantity for this variant" onChange={e => setQuantity(e.target.value)} />
                    <button type="button" onClick={handleAddVariant}>Add Variant</button>
                </form>
                {console.log()}
                {/* Variants list - this is just for visual demonstration */}
                <div className="variants-list">
                  {variantItems.length > 0 ? (
                    variantItems.map((category) => (
                      <div key={category.id} className="variant-category">
                        <h5 className="category-title">{category.type}</h5>
                        {category.sizes.map((sizeItem, sizeIndex) => (
                          <div key={sizeIndex} className="variant-size-group">
                            <div className="size-label">Size: {sizeItem.size}</div>
                            <div className="color-items">
                              {sizeItem.colors.map((colorItem, colorIndex) => (
                                <div key={colorIndex} className="variant-item">
                                  <div className="color-badge" style={{backgroundColor: colorItem.colorName.toLowerCase()}}></div>
                                  <span className="color-name">{colorItem.colorName}</span>
                                  <span className="quantity-badge">Qty: {colorItem.quantity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                        <button 
                          type="button" 
                          className="remove-category-btn" 
                          onClick={() => handleRemoveVariant(category.id)}
                        >
                          Remove Category
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="no-variants">No variants added yet</div>
                  )}
                </div>
            </div>}
            <input type="number" placeholder="Product Price" value={productPrice} onChange={e => setProductPrice(e.target.value)} required />
            <input type="number" placeholder="Discount Percentage" value={productDiscount} onChange={e => setProductDiscount(e.target.value)} min="0" max="100" />
            <input type="number" placeholder="Quantity" value={productQuantity} onChange={e => setProductQuantity(e.target.value)} required />
            <button type="submit">Add Product</button>
        </form>
    );
}