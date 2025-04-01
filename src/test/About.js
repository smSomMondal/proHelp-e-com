import React from 'react'

function About({userInfo}) {
  console.log(userInfo);
  
  return (
    <div>

    <h1>About</h1>
    <p>{userInfo.name}</p>
    <br/>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae praesentium assumenda eligendi enim amet quo explicabo, sed adipisci aliquid, quis ullam nulla reprehenderit quasi fugit esse optio atque, doloremque illum.
    </div>
  )
}

export default About
