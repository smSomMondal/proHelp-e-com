import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductPage from './components/ProductPage';
import AllProducts from './components/AllProducts';
import ProductList from "./components/ProductList";
import Login from './components/Login';
import Signup from './components/Signup';



function App() {
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
            <Route path="/products" element={<ProductList />} />
             <Route path="/productsT" element={<ProductPage />} />
          <Route path="/all-products" element={<AllProducts />} /> 
          </Routes>

        </BrowserRouter>
      </div>
    </>

  );
}

export default App;
