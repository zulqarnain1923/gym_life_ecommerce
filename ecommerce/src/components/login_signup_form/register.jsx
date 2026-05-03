import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Authcontext } from "../context/context";
const Register = () => {
  const data = useContext(Authcontext)
  const Navigation = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [passerror,setPasserror]=useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


 const validatePassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const minLength = password.length >= 8;

  if (!hasUpperCase) {
    setPasserror("Password must contain at least one uppercase letter");
    return false;
  }
  if (!hasLowerCase) {
    setPasserror("Password must contain at least one lowercase letter");
    return false;
  }
  if (!hasNumber) {
    setPasserror("Password must contain at least one number");
    return false;
  }
  if (!hasSpecialChar) {
    setPasserror("Password must contain at least one special character");
    return false;
  }
  if (!minLength) {
    setPasserror("Password must be at least 8 characters long");
    return false;
  }

  setPasserror(""); // ✅ clear error when valid
  return true;
};

 const handleSubmit = async (e) => {
  e.preventDefault();

  const isValid = validatePassword(formData.password); // ❌ no await needed

  if (!isValid) return; // stop here if invalid

  await data.runfunctions(null, 'register', formData);

  setFormData({
    name: "",
    email: "",
    password: "",
  });

  setPasserror(""); // clear error after success
};

  const handellogin = (e) => {
    e.preventDefault()
    Navigation('/login')
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-96 p-4"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        

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
        {passerror?<p className="text-red-500 text-sm mb-4">{passerror}</p>:null}
        <button
          type="submit"
          
          className="w-full bg-purple-600 mt-5 hover:bg-purple-700 active:bg-purple-600 text-white p-3 rounded-pill font-semibold transition"
        >
          Sign Up
        </button>
        <p className="text-gray-300 text-center text-[15px] mt-3 ">Aready have an account <a href="" onClick={(e) => handellogin(e)}>login</a></p>
      </form>
    </div>
  );
};

export default Register;


