import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

function Login() {

  const navigate = useNavigate();

  // =====================
  // STATES
  // =====================

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  // =====================
  // LOGIN
  // =====================

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await api.post(

        "/auth/login",

        {
          email,
          password
        }

      );

      console.log(res.data);

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Success");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }

  };

  return (

    <div
      style={{
        padding: "20px"
      }}
    >

      <h1>Login</h1>

      <form onSubmit={handleLogin}>

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "300px",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <br />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "300px",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <br />

        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px"
          }}
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;