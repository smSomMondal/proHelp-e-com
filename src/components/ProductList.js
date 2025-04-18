import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [rating, setRating] = useState(0);
  const [availability, setAvailability] = useState("All");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  useEffect(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== "All") {
      result = result.filter(p => p.category === category);
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (rating > 0) {
      result = result.filter(p => p.rating >= rating);
    }

    if (availability === "In Stock") {
      result = result.filter(p => p.inStock === true);
    } else if (availability === "Out of Stock") {
      result = result.filter(p => p.inStock === false);
    }

    if (sortOption === "priceLowHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighLow") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "ratingHighLow") {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFiltered(result);
  }, [searchTerm, category, priceRange, rating, availability, sortOption, products]);

  const handleAddToCart = async (product) => {
    try {
      await axios.post("http://localhost:5000/api/cart", {
        productId: product._id,
        quantity: 1,
      });
      alert("Added to cart!");
    } catch (err) {
      console.error("Add to cart failed:", err);
      alert("Add to cart failed!");
    }
  };

  return (
    <div style={{
      maxWidth: "1000px",
      margin: "40px auto",
      backgroundColor: "#f9f9f9",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Segoe UI', sans-serif",
      textAlign: "center"
    }}>
      <h2 style={{ fontSize: "28px", marginBottom: "25px", color: "#333" }}>🛍️ Product List</h2>

      {/* Search and Filter */}
      <input
        type="text"
        placeholder="Search by name or brand..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "10px 14px",
          width: "100%",
          maxWidth: "500px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          fontSize: "16px",
          marginBottom: "20px"
        }}
      />

      <div style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "12px",
        marginBottom: "30px"
      }}>
        <select onChange={(e) => setCategory(e.target.value)} style={dropdownStyle}>
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Kids">Kids</option>
          <option value="Beauty">Beauty</option>
        </select>

        <select onChange={(e) => setRating(Number(e.target.value))} style={dropdownStyle}>
          <option value="0">All Ratings</option>
          <option value="4">4⭐ & up</option>
          <option value="3">3⭐ & up</option>
          <option value="2">2⭐ & up</option>
        </select>

        <select onChange={(e) => setAvailability(e.target.value)} style={dropdownStyle}>
          <option value="All">All Availability</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>

        <select onChange={(e) => setSortOption(e.target.value)} style={dropdownStyle}>
          <option value="">Sort By</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="ratingHighLow">Rating: High to Low</option>
        </select>
      </div>

      {/* Products Grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {filtered.length ? filtered.map((p) => (
          <div key={p._id} style={{
            width: "250px",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            textAlign: "left"
          }}>
            <img src={p.image} alt={p.name} style={{
              width: "100%",
              height: "150px",
              objectFit: "cover",
              borderRadius: "4px"
            }} />
            <h4>{p.name}</h4>
            <p>{p.description?.slice(0, 60)}...</p>
            <p>₹{p.price} | ⭐ {p.rating}</p>

            <div>
              {p.isNew && <span style={{ color: "green", fontWeight: "bold" }}>New</span>}{" "}
              {p.isBestSeller && <span style={{ color: "orange" }}>Best Seller</span>}{" "}
              {p.discount && <span style={{ color: "red" }}>-{p.discount}%</span>}
            </div>

            <button onClick={() => handleAddToCart(p)} style={addToCartBtnStyle}>
              Add to Cart
            </button>
            <button style={wishlistBtnStyle}>❤️ Wishlist</button>
          </div>
        )) : <p style={{ fontSize: "18px", color: "#888" }}>No products found.</p>}
      </div>
    </div>
  );
}

const dropdownStyle = {
  padding: "10px 12px",
  fontSize: "15px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  backgroundColor: "#fff",
  minWidth: "150px"
};

const addToCartBtnStyle = {
  marginTop: "10px",
  padding: "10px",
  width: "100%",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

const wishlistBtnStyle = {
  marginTop: "5px",
  padding: "8px",
  width: "100%",
  backgroundColor: "#ffc107",
  color: "#000",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

export default ProductList;
