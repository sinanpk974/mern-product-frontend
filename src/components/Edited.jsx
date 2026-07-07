import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
    


const Edited = () => {
       const navigate = useNavigate()
    
        const { id } = useParams();
    
        const [product,setProduct]=useState({
            title:"",
            price:"",
            image:""})


        const convertBase64 = (file) => {
    return new Promise((resolve,reject) =>{
      const filereader = new FileReader();
      filereader.readAsDataURL(file);
      filereader.onload = () => {
        resolve(filereader.result);
      }
      filereader.onerror = (error) =>{
        reject(error)
      }
      })
  }

    
      useEffect(() => {
      const token = localStorage.getItem("token");
      if(!token) {
        return <h2>Token needed, Pls login</h2>
      }
    
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


      const handleChange= async (e) => {
   if (e.target.name === 'image'){
    const file = e.target.files[0]
    const base64 = await convertBase64(file)
    setProduct({...product, [e.target.name]: base64})
   }else{
    setProduct({...product,[e.target.name]:e.target.value})
   }
  }

      
        
    const handleSubmit = async(e)=>{
    e.preventDefault()
     try{
        // const token = localStorage.getItem('token')
        // console.log(token);

        // if(token){
        const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}api/update/${id}`,product,{
            // headers:{
            //     Authorization:`Bearer ${token}`
            // }
        })
        console.log(res);
        
        
        alert('Product Updated Successfully')
        
        navigate("/home")

    //  }else{
    //     alert("please login")
    //     navigate('/login')
    //  }
  
     }catch(error){
        console.log(error);
        
     }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-[450px] bg-white p-8 rounded-xl shadow-lg"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Edit Product
        </h1>

        
        <div className="mb-4">
          <label className="block font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        
        <div className="mb-4">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        
        <div className="mb-6">
          <img src={product.image || null}   />  
          <label className="block font-semibold mb-2">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Edited