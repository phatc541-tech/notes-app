import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

function Register() {

  const navigate = useNavigate();

  // =====================
  // STATES
  // =====================

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  // =====================
  // REGISTER
  // =====================

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const res = await api.post(

        "/auth/register",

        {
          name,
          email,
          password
        }

      );

      console.log(res.data);

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Register Success");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Register Failed");

    }

  };

  return (

    <div
      style={{
        padding: "20px"
      }}
    >

      <h1>Register</h1>

      <form onSubmit={handleRegister}>

        {/* NAME */}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={{
            width: "300px",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <br />

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
            background: "green",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px"
          }}
        >
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;