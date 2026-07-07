import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })
  const [item,setItem]=useState()

  const navigate = useNavigate()

  const handlechange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handlelogin = async(e)=>{
    e.preventDefault()
     try{
        const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}api/login`,formData)
        console.log(res);
        
        localStorage.setItem("token", res.data.token);
        console.log(res.data.token);
        
        alert('login successfull')
        navigate("/home")


  
     }catch(error){
        console.log(error);
        
     }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Login
        </h1>

        <form className="space-y-5" onSubmit={handlelogin}>

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
            Login
          </button>

        </form>

        <p className="text-center mt-5 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;