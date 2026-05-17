import {

  useState

} from "react";

import {

  useNavigate

} from "react-router-dom";

import api from "../services/api";

function Login() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  // ======================
  // LOGIN
  // ======================

  const handleLogin = async () => {

    try {

      const res =

        await api.post(

          "/auth/login",

          {

            email,
            password

          }

        );

      // SAVE TOKEN

      localStorage.setItem(

        "token",

        res.data.token

      );

      // GO HOME

      navigate("/");

    }

    catch (error) {

      console.log(error);

      alert(

        error.response?.data?.message ||

        "Login failed"

      );

    }

  };

  return (

    <div

      style={{

        padding: "40px"

      }}

    >

      <h1>

        Login

      </h1>

      <input

        type="email"

        placeholder="Email"

        value={email}

        onChange={(e) =>

          setEmail(
            e.target.value
          )

        }

        style={{

          width: "300px",

          padding: "12px",

          marginBottom: "10px"

        }}

      />

      <br />

      <input

        type="password"

        placeholder="Password"

        value={password}

        onChange={(e) =>

          setPassword(
            e.target.value
          )

        }

        style={{

          width: "300px",

          padding: "12px",

          marginBottom: "10px"

        }}

      />

      <br />

      <button

        onClick={handleLogin}

        style={{

          padding: "12px 20px",

          background: "blue",

          color: "white",

          border: "none"

        }}

      >

        Login

      </button>

    </div>

  );

}

export default Login;