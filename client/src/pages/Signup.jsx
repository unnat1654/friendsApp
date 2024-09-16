import React, { useState } from "react";
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

  return (
    <form className="signup">
      <label htmlFor="signup-name" className="signup-label">
        Full name
      </label>
      <input
        id="signup-name"
        type="text"
        className="signup-input"
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
        required
      />

      <label htmlFor="signup-email" className="signup-label">
        E-mail
      </label>
      <input
        id="signup-email"
        type="email"
        className="signup-input"
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

      <label htmlFor="signup-password" className="signup-label">
        Password
      </label>
      <input
        id="signup-password"
        type="password"
        className="signup-input"
        minLength="6"
        placeholder="Enter your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" className="signup-button" onClick={handleSubmit}>
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
