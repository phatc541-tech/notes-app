import {

  BrowserRouter,
  Routes,
  Route

} from "react-router-dom";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Home from "./pages/Home";

import Profile from "./pages/Profile";

import SharedNote from "./pages/SharedNote";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}

        <Route

          path="/"

          element={<Home />}

        />

        {/* LOGIN */}

        <Route

          path="/login"

          element={<Login />}

        />

        {/* REGISTER */}

        <Route

          path="/register"

          element={<Register />}

        />

        {/* PROFILE */}

        <Route

          path="/profile"

          element={<Profile />}

        />

        {/* SHARED NOTE */}

        <Route

          path="/share/:id"

          element={<SharedNote />}

        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;