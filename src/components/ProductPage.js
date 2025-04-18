import { useState, useEffect } from "react";
import axios from "axios";
import "./ProductPage.css";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        pId: "",
        category: "",
        subcategory: "",
        stock: "0",
        sellerId: "",
        imagesUrl: ""
    });

    const categories = {
        "Clothing": ["Men Clothing", "Women Clothing", "Kids Clothing"],
        "Footwear": ["Men Footwear", "Women Footwear", "Kids Footwear"],
        "Electronics": ["Mobiles & Tablets", "Laptops & Computers", "TV & Home Entertainment"],
        "Home & Kitchen": ["Kitchen Appliances", "Home Decor", "Furniture"],
        "Beauty & Personal Care": ["Makeup", "Skincare", "Haircare"],
        "Sports & Fitness": ["Fitness Equipment", "Sportswear"],
        "Baby Products": ["Diapers", "Baby Toys"],
        "Grocery & Essentials": ["Snacks", "Staples"],
        "Gaming & Entertainment": ["Video Games", "Gaming Accessories"],
        "Books & Stationery": ["Fiction", "Stationery"],
        "Automotive": ["Car Accessories", "Bike Accessories"]
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("http://localhost:5000/api/products");
            setProducts(data);
            setError(null);
        } catch (err) {
            setError("Failed to fetch products. Please try again later.");
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "category") {
            setFormData({
                ...formData,
                category: value,
                subcategory: "" // Reset subcategory when category changes
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post("http://localhost:5000/api/products/add", formData);
            fetchProducts();
            setFormData({
                name: "",
                description: "",
                price: "",
                pId: "",
                category: "",
                subcategory: "",
                stock: "0",
                sellerId: "",
                imagesUrl: ""
            });
            setError(null);
        } catch (error) {
            setError("Failed to add product. Please try again.");
            console.error("Error adding product:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                setLoading(true);
                await axios.delete(`http://localhost:5000/api/products/${id}`);
                fetchProducts();
                setError(null);
            } catch (error) {
                setError("Failed to delete product. Please try again.");
                console.error("Error deleting product:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="product-page">
            <h2>Product Management</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="product-form-container">
                <h3>Add New Product</h3>
                <form className="product-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            name="name" 
                            placeholder="Product Name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            name="pId" 
                            placeholder="Product ID" 
                            value={formData.pId} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            name="description" 
                            placeholder="Product Description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            name="price" 
                            type="number" 
                            placeholder="Price (₹)" 
                            value={formData.price} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <select 
                            name="category" 
                            value={formData.category} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="">Select Category</option>
                            {Object.keys(categories).map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <select 
                            name="subcategory" 
                            value={formData.subcategory} 
                            onChange={handleChange} 
                            required
                            disabled={!formData.category}
                        >
                            <option value="">Select Subcategory</option>
                            {formData.category && categories[formData.category].map((subcategory) => (
                                <option key={subcategory} value={subcategory}>
                                    {subcategory}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <input 
                            name="stock" 
                            type="number" 
                            placeholder="Stock" 
                            value={formData.stock} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            name="sellerId" 
                            placeholder="Seller ID" 
                            value={formData.sellerId} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            name="imagesUrl" 
                            placeholder="Image URL" 
                            value={formData.imagesUrl} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <button type="submit">Add Product</button>
                </form>
            </div>
            
            <div className="products-container">
                <h3>Product List</h3>
                {loading ? (
                    <div className="loading">Loading products...</div>
                ) : products.length === 0 ? (
                    <div className="empty-state">No products found. Add your first product above.</div>
                ) : (
                    <div className="product-list">
                        {products.map((product) => (
                            <div key={product._id} className="product-card">
                                <button 
                                    className="delete-button" 
                                    onClick={() => handleDelete(product._id)}
                                >
                                    Delete
                                </button>
                                <img 
                                    src={product.imagesUrl || "https://via.placeholder.com/300x200?text=No+Image"} 
                                    alt={product.name} 
                                />
                                <h3>{product.name}</h3>
                                <p><strong>Product ID:</strong> {product.pId}</p>
                                <p><strong>₹{product.price}</strong></p>
                                <p>{product.description}</p>
                                <p><strong>Category:</strong> {product.category}</p>
                                <p><strong>Subcategory:</strong> {product.subcategory}</p>
                                <p><strong>Stock:</strong> {product.stock}</p>
                                <p><strong>Seller ID:</strong> {product.sellerId}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPage;