import { useState, useEffect } from "react";
import axios from "axios";
import "./AllProducts.css";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [categories, setCategories] = useState([]);
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [brands, setBrands] = useState([]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("http://localhost:5000/api/products");
            setProducts(data);
            
            // Extract unique categories and brands
            const uniqueCategories = [...new Set(data.map(product => product.category))];
            const uniqueBrands = [...new Set(data.map(product => product.brand || "Other"))];
            setCategories(uniqueCategories);
            setBrands(uniqueBrands);
            
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

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setSortOrder("asc");
        }
    };

    const handlePriceChange = (type, value) => {
        setPriceRange(prev => ({
            ...prev,
            [type]: value
        }));
    };

    const handleBrandChange = (brand) => {
        setSelectedBrands(prev => 
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    const handleRatingChange = (rating) => {
        setSelectedRatings(prev =>
            prev.includes(rating)
                ? prev.filter(r => r !== rating)
                : [...prev, rating]
        );
    };

    const filteredAndSortedProducts = products
        .filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                product.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
            const matchesPrice = (!priceRange.min || product.price >= Number(priceRange.min)) &&
                               (!priceRange.max || product.price <= Number(priceRange.max));
            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand || "Other");
            const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(Math.floor(product.rating || 0));
            return matchesSearch && matchesCategory && matchesPrice && matchesBrand && matchesRating;
        })
        .sort((a, b) => {
            if (sortBy === "price") {
                return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
            }
            if (sortBy === "name") {
                return sortOrder === "asc" 
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            }
            return 0;
        });

    return (
        <div className="all-products-page">
            <div className="page-header">
                <h1>Discover Our Products</h1>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="main-content">
                <div className="filter-sidebar">
                    <div className="search-section">
                        <h2>Search & Filter</h2>
                        <div className="search-container">
                            <div className="search-box">
                                <input
                                    type="text"
                                    placeholder="Search by name or description..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <i className="search-icon">🔍</i>
                            </div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="category-select"
                            >
                                <option value="all">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={sortBy}
                                onChange={(e) => handleSort(e.target.value)}
                                className="category-select"
                            >
                                <option value="name">Sort by Name</option>
                                <option value="price">Sort by Price</option>
                            </select>
                        </div>
                    </div>

                    <div className="filter-section">
                        <h3 className="filter-title">Price Range</h3>
                        <div className="price-range">
                            <div className="price-input">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={priceRange.min}
                                    onChange={(e) => handlePriceChange("min", e.target.value)}
                                />
                                <span>to</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={priceRange.max}
                                    onChange={(e) => handlePriceChange("max", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="filter-section">
                        <h3 className="filter-title">Brands</h3>
                        <div className="filter-options">
                            {brands.map(brand => (
                                <div key={brand} className="filter-option">
                                    <input
                                        type="checkbox"
                                        id={`brand-${brand}`}
                                        checked={selectedBrands.includes(brand)}
                                        onChange={() => handleBrandChange(brand)}
                                    />
                                    <label htmlFor={`brand-${brand}`}>{brand}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <h3 className="filter-title">Rating</h3>
                        <div className="filter-options">
                            {[5, 4, 3, 2, 1].map(rating => (
                                <div key={rating} className="filter-option">
                                    <input
                                        type="checkbox"
                                        id={`rating-${rating}`}
                                        checked={selectedRatings.includes(rating)}
                                        onChange={() => handleRatingChange(rating)}
                                    />
                                    <label htmlFor={`rating-${rating}`}>
                                        {rating} ★ & above
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="products-container">
                    {loading ? (
                        <div className="loading">
                            <div className="loading-spinner"></div>
                            Loading products...
                        </div>
                    ) : filteredAndSortedProducts.length === 0 ? (
                        <div className="empty-state">
                            {searchTerm 
                                ? "No products found matching your search. Try different keywords or categories."
                                : "No products available at the moment. Please check back later."}
                        </div>
                    ) : (
                        <div className="products-grid">
                            {filteredAndSortedProducts.map((product) => (
                                <div key={product._id} className="product-card">
                                    <div className="product-image">
                                        <img 
                                            src={product.image || "https://via.placeholder.com/300x200?text=No+Image"} 
                                            alt={product.name}
                                            loading="lazy"
                                        />
                                        {product.quantity < 5 && product.quantity > 0 && (
                                            <div className="stock-badge low-stock">Low Stock</div>
                                        )}
                                        {product.quantity === 0 && (
                                            <div className="stock-badge out-of-stock">Out of Stock</div>
                                        )}
                                    </div>
                                    <div className="product-info">
                                        <h3>{product.name}</h3>
                                        <p className="price">₹{product.price.toLocaleString()}</p>
                                        <p className="description">{product.description}</p>
                                        <p className="category">{product.category}</p>
                                        <button 
                                            className="add-to-cart-btn"
                                            disabled={product.quantity === 0}
                                            onClick={() => {
                                                // Add to cart functionality will be implemented later
                                                console.log("Adding to cart:", product.name);
                                            }}
                                        >
                                            {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
