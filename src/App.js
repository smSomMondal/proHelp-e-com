import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './test/Home';
import Contact from './test/Contact';
import About from './test/About';

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
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/con' element={<Contact/>}/>
          <Route path='abo' element={<About userInfo={user} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
