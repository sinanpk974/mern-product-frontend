import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const Product = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product,setProduct]=useState(null)

  useEffect(() => {
  const token = localStorage.getItem("token");
  
  axios
    .get(`${import.meta.env.VITE_SERVER_URL}api/display/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      
    })
    .then((res) => {
      console.log(res.data);
      setProduct(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, [id]);
 
 if (!product) {
    return <h2>Loading...</h2>;
  }
 

  const delAlert=()=>{
    const confirmDel = window.confirm("Are you sure you want to delete this product?")
    if(!confirmDel){
      return
    }else{
      deletePro()
    }
  }

  const deletePro= async()=>{
    try{
        const token = localStorage.getItem("token");
        if(token){
        const res = await axios.delete(`${import.meta.env.VITE_SERVER_URL}api/delete/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        
        
        
        alert('Product Deleted Successfully')
        
        navigate("/home")

     }else{
        alert("please login")
        navigate('/login')
     }
  
     }catch(error){
        console.log(error);
        
     }
  }
  
    
  return (
    <>
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold">PRODUCT</h1>
    </div>
    <div className="flex justify-center items-center   p-6">
  <div className="w-[450px] border rounded-xl shadow-lg bg-white p-5">

    <div className="text-center mb-4">
      <h2 className="text-3xl font-bold">{product.title}</h2>
      <p className="text-2xl font-semibold text-green-600 mt-2">
        ₹{product.price}
      </p>
    </div>

  
    <img
      src={product.image}
      alt={product.title}
      className="w-full h-72 object-cover rounded-lg"
    />

    <div className="flex justify-center gap-6 mt-6">
      <Link to={`/update/${product._id}`}>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Edit
      </button></Link>
      
      <button
        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
        onClick={delAlert}
      >
        Delete
      </button>
      
    </div>

  </div>
</div>
   </>
  )
}

export default Product