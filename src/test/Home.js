import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList'; // 👈 Make sure this path is correct

function Home() {
  const navg = useNavigate();

  const handelClick = () => {
    console.log("click");
    navg('/abo');
  };

  return (
    <div>
      <h1>Home</h1>
      <Link to={'/con'}>Contact</Link><br/>
      <button onClick={handelClick}>About</button>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa exercitationem quasi nobis
        aperiam veritatis omnis laborum accusantium officiis odit nesciunt iure nostrum ex aliquid,
        odio ut asperiores doloremque eveniet porro?
      </p>

      {/* 👇 Product List Section */}
      <h2>Products</h2>
      <ProductList />
    </div>
  );
}

export default Home;
