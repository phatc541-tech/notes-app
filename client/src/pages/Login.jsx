import { useState } from "react"
import api from "../services/api"

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const res = await api.post("/auth/login", {
        email,
        password
      })
      localStorage.setItem("token", res.data.token);
      alert("Login Success")


      console.log(res.data)

    } catch (error) {

      console.log(error)

      alert("Login Failed")

    }
  }

  return (

    <div>

      <h1>Login</h1>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  )
}