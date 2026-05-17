import {

  useState

} from "react";

import {

  useNavigate,
  Link

} from "react-router-dom";

import api from "../services/api";

function Login() {

  const navigate =
    useNavigate();

  // ======================
  // STATES
  // ======================

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

      // ======================
      // SAVE TOKEN
      // ======================

      localStorage.setItem(

        "token",

        res.data.token

      );

      // ======================
      // GO HOME
      // ======================

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

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        height: "100vh",

        background: "#f5f5f5"

      }}

    >

      <div

        style={{

          background: "white",

          padding: "40px",

          borderRadius: "12px",

          width: "350px",

          boxShadow:

            "0 0 10px rgba(0,0,0,0.1)"

        }}

      >

        <h1

          style={{

            marginBottom: "20px",

            textAlign: "center"

          }}

        >

          Login

        </h1>

        {/* EMAIL */}

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

            width: "100%",

            padding: "12px",

            marginBottom: "15px",

            borderRadius: "8px",

            border:

              "1px solid #ccc"

          }}

        />

        {/* PASSWORD */}

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

            width: "100%",

            padding: "12px",

            marginBottom: "20px",

            borderRadius: "8px",

            border:

              "1px solid #ccc"

          }}

        />

        {/* BUTTON */}

        <button

          onClick={handleLogin}

          style={{

            width: "100%",

            padding: "12px",

            background: "blue",

            color: "white",

            border: "none",

            borderRadius: "8px",

            cursor: "pointer",

            fontWeight: "bold"

          }}

        >

          Login

        </button>

        {/* REGISTER */}

        <p

          style={{

            marginTop: "20px",

            textAlign: "center"

          }}

        >

          Don't have an account?

          <Link

            to="/register"

            style={{

              marginLeft: "5px"

            }}

          >

            Register

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;