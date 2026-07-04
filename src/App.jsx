import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import AddProd from "./components/AddProd"
import Product from "./components/Product";
import Edited from "./components/Edited";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addprod" element={<AddProd/>} />
        <Route path="/display/:id" element={<Product/>} />
        <Route path="/update/:id" element={<Edited/>}/>
      </Routes>
    </>
  );
}

export default App;