import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './components/ProductPage';
import AllProducts from './components/AllProducts';


function App() {
  const user = {
    name: "Alice",
    contact: {
      email: "alice@example.com",
      phone: "123-456-7890"
    }
  };

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <nav style={{ marginBottom: "20px" }}>
            <Link to="/">Home</Link> |{" "}
            <Link to="/con">Contact</Link> |{" "}
            <Link to="/abo">About</Link> |{" "}
            <Link to="/products">Product List</Link>
          </nav>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/con" element={<Contact />} />
            <Route path="/abo" element={<About userInfo={user} />} />
            <Route path="/products" element={<ProductList />} />
            {/* <Route path="/products" element={<ProductPage />} />
          <Route path="/all-products" element={<AllProducts />} /> */}
          </Routes>

        </BrowserRouter>
      </div>
    </>

  );
}

export default App;
