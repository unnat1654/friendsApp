import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/authcontext";

const Login = () => {
  const [details, setDetails] = useSearchParams({ email: "" });
  const email = details.get("email");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        "https://friendsapp-jfkv.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );
      if (data && data.success) {
        setAuth({ name: data.name, token: data.token });
        localStorage.setItem(
          "auth",
          JSON.stringify({ name: data.name, token: data.token })
        );
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  };

  useEffect(() => {
    if (auth?.token) {
      navigate("/");
    }
  }, [auth?.token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="login bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <label
          htmlFor="login-email"
          className="login-label block text-gray-700 text-sm font-medium mb-2"
        >
          E-mail
        </label>
        <input
          id="login-email"
          type="email"
          className="login-input block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
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
          htmlFor="login-password"
          className="login-label block text-gray-700 text-sm font-medium mb-2 mt-4"
        >
          Password
        </label>
        <input
          id="login-password"
          type="password"
          className="login-input block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          minLength="6"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span
          onClick={() => navigate("/signup")}
          className="login-redirect block text-sm text-blue-500 mt-4 cursor-pointer hover:underline"
        >
          Create new account
        </span>
        <button
          type="submit"
          className="login-button mt-6 w-full py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={handleSubmit}
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
