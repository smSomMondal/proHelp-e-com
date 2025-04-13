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
        category: "",
        quantity: "",
        image: ""
    });

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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post("http://localhost:5000/api/products/add", formData);
            fetchProducts();
            setFormData({ name: "", description: "", price: "", category: "", quantity: "", image: "" });
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
                        <input 
                            name="category" 
                            placeholder="Category" 
                            value={formData.category} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            name="quantity" 
                            type="number" 
                            placeholder="Quantity" 
                            value={formData.quantity} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            name="image" 
                            placeholder="Image URL" 
                            value={formData.image} 
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
                                    src={product.image || "https://via.placeholder.com/300x200?text=No+Image"} 
                                    alt={product.name} 
                                />
                                <h3>{product.name}</h3>
                                <p><strong>₹{product.price}</strong></p>
                                <p>{product.description}</p>
                                <p>Category: {product.category}</p>
                                <p>Quantity: {product.quantity}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPage;