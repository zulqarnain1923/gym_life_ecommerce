import { Navigation } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Authcontext } from "../context/context";


const Login = () => {
  const data=useContext(Authcontext)
  const Navigation=useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handelregister=(e)=>{
    e.preventDefault()
    Navigation('/register')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-96 p-4"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-6 p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <button
          onClick={(e)=> (data.runfunctions(e,'login',formData),console.log(formData))}
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold transition mt-4 rounded-pill"
        >
          Login
        </button>
        <p className="text-gray-300 text-center text-[15px] mt-3">Aready have an account <a href="" onClick={(e)=> (handelregister(e))}>register</a></p>

      </form>
    </div>
  );
};

export default Login;
