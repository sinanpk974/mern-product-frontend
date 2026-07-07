import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate()
  
  const [search,setSearch]=useState("")


  const searchPro = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}api/display`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const products = res.data;
    const product = products.find((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );

    if (product) {
      navigate(`/display/${product._id}`);
    } else {
      alert("Product not found");
    }
  } catch (err) {
    console.log(err);
  }
};
  
  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        <h1 className="text-3xl font-bold">
          Welcome
        </h1>

        <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
       if (e.key === "Enter") {
        searchPro();
    }
  }}
      type="text"
      placeholder="Search..."
      className="w-56 px-2 py-2 rounded border border-white bg-blue-600 text-white placeholder-white outline-none focus:border-white"
       />

        <div className="flex gap-3">
          <Link
            to="addprod"
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
          >
            Add Product
          </Link>

          <Link
            to="home"
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
          >
            Home
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;