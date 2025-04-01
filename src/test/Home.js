import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Home() {


  const navg = useNavigate();
  const handelClick = ()=>{
    console.log("click");
    
    navg('/abo')
  }
  return (
    <div>
        <h1>Home</h1>
        <Link to={'/con'}>contact</Link><br/>
        <button onClick={handelClick}>About</button>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa exercitationem quasi nobis aperiam veritatis omnis laborum accusantium officiis odit nesciunt iure nostrum ex aliquid, odio ut asperiores doloremque eveniet porro?
    </div>
  )
}

export default Home