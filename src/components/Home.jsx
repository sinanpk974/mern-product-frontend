import axios from "axios";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {

const [product,setProduct]=useState([])

  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_SERVER_URL}api/display`)
    .then((res)=>{
        console.log(res.data);
        setProduct(res.data)
       })

  },[])



  return (
  <>
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold">PRODUCT</h1>
    </div>
    <div className="grid grid-cols-5 gap-4 p-4">
  {product.map((item) => (
    <Link
      key={item._id}
      to={`/display/${item._id}`}
      className="block"
    >
      <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer">
        <h2 className="text-xl font-bold">{item.title}</h2>

        <p>{item.price}</p>

        <img
          src={item.image}
          alt={item.title}
          className="w-80 h-50 object-cover rounded"
        />
      </div>
    </Link>
  ))}
   </div>
   </>
  );
}

export default Home;