import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from './test/Home';
import Contact from './test/Contact';
import About from './test/About';
import ProductList from "./components/ProductList";

function App() {
  const user = {
    name: "Alice",
    contact: {
      email: "alice@example.com",
      phone: "123-456-7890"
    }
  };

  return (
    <BrowserRouter>
      <div>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/">Home</Link> |{" "}
          <Link to="/con">Contact</Link> |{" "}
          <Link to="/abo">About</Link> |{" "}
          <Link to="/products">Product List</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/con" element={<Contact />} />
          <Route path="/abo" element={<About userInfo={user} />} />
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
