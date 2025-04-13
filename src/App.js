import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import ProductPage from './components/ProductPage';
// import AllProducts from './components/AllProducts';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/products" element={<ProductPage />} />
          <Route path="/all-products" element={<AllProducts />} /> */}
          </Routes>

        </BrowserRouter>
      </div>
    </>

  );
}

export default App;
