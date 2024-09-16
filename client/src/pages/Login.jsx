import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Login = () => {
  const [details, setDetails] = useSearchParams({ email: "" });
  const email = details.get("email");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        "http://localhost:8080/api/auth/login",
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

  return (
    <form className="login">
      <label htmlFor="login-email" className="login-label">
        E-mail
      </label>
      <input
        id="login-email"
        type="email"
        className="login-input"
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

      <label htmlFor="login-password" className="login-label">
        Password
      </label>
      <input
        id="login-password"
        type="password"
        className="login-input"
        minLength="6"
        placeholder="Enter your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" className="login-button" onClick={handleSubmit}>
        Log in
      </button>
    </form>
  );
};

export default Login;
