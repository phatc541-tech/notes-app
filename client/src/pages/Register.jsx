import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

function Register() {

  // navigate
  const navigate = useNavigate();

  // states
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  // register
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

      // lưu token
      localStorage.setItem(

        "token",

        res.data.token

      );

      alert("Register Success");

      // reset form
      setName("");

      setEmail("");

      setPassword("");

      // vào home luôn
      navigate("/");

    } catch (error) {

      console.log(error.response.data);

      alert("Register Failed");

    }
  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Register</h1>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;