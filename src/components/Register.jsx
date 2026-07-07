import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { useNavigate } from "react-router-dom";


function Register() {

  const [formData,setFormData]=useState({
    name :"",
    email:"",
    password:""
  })

  const navigate=useNavigate()

  const handlechange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  
  const handlesubmit = async(e)=>{
    e.preventDefault()
     try{
        const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}api/register`,formData)
        console.log(res);
        
        alert('registered')
        navigate("/login")
  
     }catch(error){
        console.log(error);
        
     }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Register
        </h1>

        <form className="space-y-5"  onSubmit={handlesubmit}>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="name"
              onChange={handlechange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="email"
              onChange={handlechange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="password"
              onChange={handlechange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-5 text-gray-600">
          Already registered?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;