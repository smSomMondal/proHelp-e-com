import React from 'react';
import { BrowserRouter, Navigate, Routes, Route,Outlet } from 'react-router-dom';
import ProductPage from './components/ProductPage';
import AllProducts from './components/AllProducts';
import ProductList from "./components/ProductList";
import Login from './components/Login';
import Signup from './components/Signup';
import {useUser} from './context/userContext';

const PrivetComponent=()=>{
  //const {userType}=useUser()
  //const auth=localStorage.getItem('user')
  // console.log(userType);
  const storedUser = localStorage.getItem("user");
  return storedUser?<Outlet />:<Navigate to={'/signup'} />
}


function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<ProductPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<PrivetComponent />}>
              <Route path="/products" element={<ProductList />} />
              <Route path="/productsT" element={<ProductPage />} />
              <Route path="/all-products" element={<AllProducts />} />
            </Route>
          </Routes>

        </BrowserRouter>
      </div>
    </>

  );
}


export default App;
