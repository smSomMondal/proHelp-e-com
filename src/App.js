import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './components/ProductPage';
import AllProducts from './components/AllProducts';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          
          <Route path="/products" element={<ProductPage />} />
          <Route path="/all-products" element={<AllProducts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
