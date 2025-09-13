import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
// removed unused jwt-decode import
// import {jwtDecode} from "jwt-decode";

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
export default function ProductForm({ onClose, onProductAdded}) {
    const [image, setImage] = useState(null);
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productCategory, setProductCategory] = useState(categories[0]);
    const [productPrice, setProductPrice] = useState("");
    const [productDiscount, setProductDiscount] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    // removed unused productAdded state
    // const [productAdded , setProductAdded] = useState(false);
    const [productSubCategory, setProductSubCategory] = useState(""); 
    // removed unused productInfo state
    // const [productInfo, setProductInfo] = useState([{}]);
    const [variantItems , setVariantItems] = useState([]);
    const [size , setSize] = useState("");
    const [color , setColor] = useState("");
    const [quantity , setQuantity] = useState("");
    // removed unused lastActionRef
    // const lastActionRef = useRef(null);
    // removed unused side-effecting variable
    // const sizeThing = productCategory === "Woman's Fashion" || productCategory === "Men's Fashion" ? setProductCategory("Clothing") : null;
    const subcategories = {
        "Electronics": [
            {
                type: "Phone / Tablet / Laptop",
                fields: [
                    { name: "brand", type: "String" },
                    { name: "storage", type: "Number" },
                    { name: "ram", type: "Number" },
                    { name: "battery", type: "Number" },
                    { name: "dimensions", type: "String" },
                    { name: "screenSize", type: "Number" },
                ]
            },
            {
                type: "Headphones",
                fields: [
                    { name: "brand", type: "String" },
                    { name: "connectionType", type: "String" },
                    { name: "battery", type: "Number" },
                ]
            },
            {
                type: "Smartwatch",
                fields: [
                    { name: "brand", type: "String" },
                    { name: "battery", type: "Number" },
                    { name: "dimensions", type: "String" },
                    { name: "screenSize", type: "Number" },
                ]
            },
            {
                type: "Camera",
                fields: [
                    { name: "brand", type: "String" },
                    { name: "battery", type: "Number" },
                    { name: "dimensions", type: "String" },
                    { name: "screenSize", type: "Number" },
                ]
            }
        ],
        "Home Appliances": [
            {
                type: "Home Appliances",
                fields: [
                    { name: "power", type: "Number" },
                    { name: "capacity", type: "Number" },
                    { name: "dimensions", type: "String" },
                ]
            }
        ],
        "Groceries & Pets": [
            {
                type: "Food",
                fields: [
                    { name: "weight", type: "Number" },
                    { name: "brand", type: "String" },
                    { name: "expiryDate", type: "Date" },
                    {name : "stock", type: "Number"}
                ]
            },
            {
                type: "Drink",
                fields: [
                    { name: "volume", type: "Number" },
                    { name: "brand", type: "String" },
                    { name: "expiryDate", type: "Date" },
                    { name: "stock", type: "Number" }
                ]
            }
        ],
        "Baby's & Toys": [
            {
                type: "Clothing",
                sizes: [],
                fields: [
                    {
                        name: "sizes",
                        type: "Array",
                        subfields: [
                            { name: "size", type: "String" },
                        ]
                    }
                ]
            },
            {
                type: "Baby Gear",
                fields: [
                    { name: "weightLimit", type: "Number" },
                    { name: "dimensions", type: "String" },
                ]
            },
            {
                type: "Baby Toys",
                fields: [
                    { name: "ageLimit", type: "String" },
                ]
            }
        ],
        "Sports & Outdoor": [
            {
                type: "Clothing",
                sizes: ["XS","S","M","L","XL","XXL"],
                fields: [
                    {
                        name: "sizes",
                        type: "Array",
                        subfields: [
                            { name: "size", type: "String" },
                            {
                                name: "colors",
                                type: "Array",
                            }
                        ]
                    }
                ]
            },
            {
                type: "Racquet / Ball / Bag / Other",
                sizes: ["Small","Medium","Large"],
                fields: [
                    {
                        name: "sizes",
                        type: "Array",
                        subfields: [
                            { name: "size", type: "String" },
                        ]
                    },
                    { name: "weight", type: "Number" }
                ]
            }
        ],
        "Health & Beauty": [
            {
                type: "Cosmetics & Fragrance",
                fields: [
                    { name: "weight", type: "Number" },
                    { name: "brand", type: "String" },
                    { name: "expiryDate", type: "Date" },
                    { name: "scent", type: "String", optional: true },
                    { name: "gender", type: "String" },
                    { name: "stock", type: "Number" }
                ]
            },
            {
                type: "Personal Care & Hygiene",
                fields: [
                    { name: "volume", type: "Number" },
                    { name: "brand", type: "String" },
                    { name: "expiryDate", type: "Date" },
                    { name: "scent", type: "String", optional: true },
                    { name: "gender", type: "String" },
                    { name: "stock", type: "Number" }
                ]
            }
        ]
    };
    //const sizes = ["XS", "S", "M", "L", "XL", "XXL"]; 
    const colors = ["Red", "Blue", "Green", "Black", "White", "Yellow", "Purple", "Orange", "Pink", "Gray", "Brown"];
    let token = localStorage.getItem("authToken");
    // let decryptedToken = token ? jwtDecode(token) : {};
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
        formData.append('productSubCategory', productSubCategory);
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
        // setProductAdded(true); // removed unused state update
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
    // helper: derive available sizes from selected subcategory definition (if any)
    const getAvailableSizes = () => {
        if (!productCategory || !productSubCategory) return [];
        const subcat = subcategories[productCategory]?.find(s => s.type === productSubCategory);
        if (!subcat) return [];
        // If subcategory explicitly provides a sizes list, return it
        if (Array.isArray(subcat.sizes)) return subcat.sizes;
        // If fields include a sizes array structure, choose a sensible default list
        const hasSizesField = subcat.fields?.some(f => f.name === 'sizes' && f.type === 'Array');
        if (hasSizesField) return ["XS","S","M","L","XL","XXL"]; // default apparel sizes
        return [];
    };
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
            {subcategories[productCategory] && (
                <select value={productSubCategory} onChange={e => setProductSubCategory(e.target.value)} required>
                    <option value="">Select Subcategory</option>
                    {subcategories[productCategory]?.map((subcat) => (
                        <option key={subcat.type} value={subcat.type}>{subcat.type}</option>
                    ))}
                </select>
            )}
            {
            <div>
               {(productCategory !== "Medicine"&& productCategory !== "Groceries & Pets" && productCategory !== "Home Appliances") ? (<form className='Add-variant-form'>
                    <h4>Product Variants</h4>
                    { productCategory !== "Electronics" && getAvailableSizes().length !== 0 && (
                        <select aria-label="Size" title="Select size for this variant" onChange={e =>  setSize(e.target.value)}>
                            {getAvailableSizes().map(size => (
                                <option key={size} value={size} >{size}</option>
                            ))}
                        </select> 
                    )}
                    <select aria-label="Color" title="Select color for this variant" onChange={e => setColor(e.target.value)}>
                        <option value="">Select Color</option>
                        {colors.map((color) => (
                            <option key={color} value={color}>{color}</option>
                        ))}
                    </select>
                    <input type="number" placeholder="Quantity" min="1" aria-label="Quantity" title="Enter quantity for this variant" onChange={e => setQuantity(e.target.value)} />
                    <button type="button" onClick={handleAddVariant}>Add Variant</button>
                </form>) : null}
                {console.log()}
                {/* Variants list - this is just for visual demonstration */}
                {console.log(`testing groceries ${productCategory}`)}
                <div className={`variants-list ${productCategory !== "Medicine"&& productCategory !== "Groceries & Pets" && productCategory !== "Home Appliances" ? "show" : "hide"}`}>
                { (productCategory !== "Medicine"&& productCategory !== "Groceries & Pets" && productCategory !== "Home Appliances")? variantItems.length > 0 ? (
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
                  ) : null}
                </div>
            </div>}
            {/* Dynamic fields based on selected subcategory */}
            {productSubCategory && (
                <div className="dynamic-fields-section">
                    <h3>Product Specifications</h3>
                    {subcategories[productCategory]?.find((subcat) => subcat.type === productSubCategory)?.fields.map((field, index) => {
                        if (field.type === "Array") {
                            return (
                                <div key={`${field.name}-${index}`} className="field-group array-field">
                                    <h4>{field.name.charAt(0).toUpperCase() + field.name.slice(1)}</h4>
                                    {field.subfields.map((subfield, subIndex) => (
                                        <div key={`${field.name}-${subfield.name}-${subIndex}`} className="subfield-group">
                                            <label htmlFor={`field-${field.name}-${subfield.name}`}>{subfield.name.charAt(0).toUpperCase() + subfield.name.slice(1)}:</label>
                                            <input
                                                type={subfield.type === "Number" ? "number" : "text"}
                                                id={`field-${field.name}-${subfield.name}`}
                                                placeholder={`Enter ${subfield.name}`}
                                                className="styled-input"
                                            />
                                        </div>
                                    ))}
                                </div>
                            );
                        } else {
                            return (
                                <div key={`${field.name}-${index}`} className="field-group">
                                    <label htmlFor={`field-${field.name}`}>{field.name.charAt(0).toUpperCase() + field.name.slice(1)}:</label>
                                    <input
                                        type={field.type === "Number" ? "number" : "text"}
                                        id={`field-${field.name}`}
                                        placeholder={`Enter ${field.name}`}
                                        className="styled-input"
                                    />
                                </div>
                            );
                        }
                    })}
                </div>
            )}
            <input type="number" placeholder="Product Price" value={productPrice} onChange={e => setProductPrice(e.target.value)} required />
            <input type="number" placeholder="Discount Percentage" value={productDiscount} onChange={e => setProductDiscount(e.target.value)} min="0" max="100" />
            <input type="number" placeholder="Quantity" value={productQuantity} onChange={e => setProductQuantity(e.target.value)} required />
            <button type="submit">Add Product</button>
        </form>
    );
}
// M should not have sizes etc no variants --> show stock remove variants --> Done
// Electronics should not have sizes . --> remove sizes and stock ---> Done
// Baby gear remove color non sense And size & Toys ---> Done
// Food Remove variants and drinks ---> Done
// Done ==> now we should put that in components but i will not 