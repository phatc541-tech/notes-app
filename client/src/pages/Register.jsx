import {

  useState

} from "react";

import {

  useNavigate,
  Link

} from "react-router-dom";

import api from "../services/api";

function Register() {

  const navigate =
    useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const registerUser = async () => {

    try {

      const res =

        await api.post(

          "/auth/register",

          {

            username,
            email,
            password

          }

        );

      localStorage.setItem(

        "token",

        res.data.token

      );

      navigate("/");

    }

    catch (error) {

      console.log(error);

      alert(

        error.response?.data?.message ||

        "Register failed"

      );

    }

  };

  return (

    <div

      style={{

        height: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        background: "#f5f5f5"

      }}

    >

      <div

        style={{

          width: "350px",

          background: "white",

          padding: "30px",

          borderRadius: "12px",

          boxShadow:

            "0 0 10px rgba(0,0,0,0.1)"

        }}

      >

        <h2
          style={{
            textAlign: "center"
          }}
        >

          Register

        </h2>

        <input

          type="text"

          placeholder="Username"

          value={username}

          onChange={(e) =>

            setUsername(

              e.target.value

            )

          }

          style={{

            width: "100%",

            padding: "12px",

            marginBottom: "12px"

          }}

        />

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

            marginBottom: "12px"

          }}

        />

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

            marginBottom: "20px"

          }}

        />

        <button

          onClick={registerUser}

          style={{

            width: "100%",

            padding: "12px",

            background: "blue",

            color: "white",

            border: "none",

            borderRadius: "8px"

          }}

        >

          Register

        </button>

        <p
          style={{
            marginTop: "20px",
            textAlign: "center"
          }}
        >

          Already have account?

          <Link to="/login">

            Login

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;