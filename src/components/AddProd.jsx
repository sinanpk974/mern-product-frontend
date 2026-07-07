import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProd() {
  const [formData,setFormData]=useState({
    title:"",
    price:"",
    image:""
  })

  const navigate = useNavigate()

  
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

  // const handlechange=(e)=>{
  //   setFormData({...formData,[e.target.name]:e.target.value})
  // }
 
  const handlechange= async (e) => {
   if (e.target.name === 'image'){
    const file = e.target.files[0]
    const base64 = await convertBase64(file)
    setFormData({...formData, [e.target.name]: base64})
   }else{
    setFormData({...formData,[e.target.name]:e.target.value})
   }
  }


  const handleadd = async(e)=>{
    e.preventDefault()
     try{
        const token = localStorage.getItem('token')
        console.log(token);

        if(token){
        const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}api/adddata`,formData,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        console.log(res);
        
        
        alert('Product Added Successfully')
        setFormData({
            title:"",
            price:"",
            image:""
        })
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
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">

      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Add Product
      </h1>

      <form  className="space-y-5" onSubmit={handleadd}>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Product Title
          </label>
          <input
            type="text"
            placeholder="Enter product title"
            onChange={handlechange}
            name="title"
        
        
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Price
          </label>
          <input
            type="number"
            placeholder="Enter product price"
            onChange={handlechange}
            name="price"
            
    
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Image 
          </label>
          <input
            type="file"
            placeholder="Paste image URL"
            onChange={handlechange}
            name="image"
    
        
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Product
        </button>

      </form>

    </div>
  </div>
);
  
}

export default AddProd