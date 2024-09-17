import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authcontext";

const Signup = () => {
  const [auth, setAuth] = useAuth();
  const [details, setDetails] = useSearchParams({ name: "", email: "" });
  const name = details.get("name");
  const email = details.get("email");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const name_value = name;
      const { data } = await axios.post(
        "http://localhost:8080/api/auth/signup",
        {
          name,
          email,
          password,
        }
      );
      if (data && data.success) {
        setAuth({ name: name_value, token: data.token });
        localStorage.setItem(
          "auth",
          JSON.stringify({ name: name_value, token: data.token })
        );
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  };

  useEffect(()=>{
    if(auth?.token){
      navigate("/");
    }
  },[auth?.token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="signup bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <label
          htmlFor="signup-name"
          className="signup-label block text-gray-700 text-sm font-medium mb-2"
        >
          Full name
        </label>
        <input
          id="signup-name"
          type="text"
          className="signup-input block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) =>
            setDetails(
              (prev) => {
                prev.set("name", e.target.value);
                return prev;
              },
              { replace: true }
            )
          }
          maxLength="25"
          required
        />

        <label
          htmlFor="signup-email"
          className="signup-label block text-gray-700 text-sm font-medium mb-2 mt-4"
        >
          E-mail
        </label>
        <input
          id="signup-email"
          type="email"
          className="signup-input block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your E-mail"
          value={email}
          onChange={(e) =>
            setDetails(
              (prev) => {
                prev.set("email", e.target.value);
                return prev;
              },
              { replace: true }
            )
          }
          required
        />

        <label
          htmlFor="signup-password"
          className="signup-label block text-gray-700 text-sm font-medium mb-2 mt-4"
        >
          Password
        </label>
        <input
          id="signup-password"
          type="password"
          className="signup-input block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          minLength="6"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span onClick={()=>navigate("/login")} className="signup-redirect block text-sm text-blue-500 mt-4 cursor-pointer hover:underline">Log in instead</span>
        <button
          type="submit"
          className="signup-button mt-6 w-full py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
