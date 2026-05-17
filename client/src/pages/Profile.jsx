import {

  useEffect,
  useState

} from "react";

import api from "../services/api";

function Profile() {

  const [user, setUser] =
    useState(null);

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [avatar, setAvatar] =
    useState("");

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile = async () => {

    try {

      const res =

        await api.get(

          "/auth/profile"

        );

      setUser(res.data);

      setUsername(

        res.data.username || ""

      );

      setEmail(

        res.data.email || ""

      );

      setAvatar(

        res.data.avatar || ""

      );

    }

    catch (error) {

      console.log(error);

    }

  };

  const updateProfile = async () => {

    try {

      const res =

        await api.put(

          "/auth/profile",

          {

            username,
            email,
            avatar

          }

        );

      setUser(res.data);

      alert(

        "Profile updated"

      );

    }

    catch (error) {

      console.log(error);

      alert("Update failed");

    }

  };

  if (!user) {

    return (

      <div
        style={{
          padding: "40px"
        }}
      >

        Loading...

      </div>

    );

  }

  return (

    <div

      style={{

        padding: "40px",

        maxWidth: "500px",

        margin: "0 auto"

      }}

    >

      <h1>

        My Profile

      </h1>

      <img

        src={avatar}

        alt="avatar"

        width="150"

        height="150"

        style={{

          borderRadius: "50%",

          marginBottom: "20px",

          objectFit: "cover"

        }}

      />

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

          marginBottom: "10px"

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

          marginBottom: "10px"

        }}

      />

      <input

        type="text"

        placeholder="Avatar URL"

        value={avatar}

        onChange={(e) =>

          setAvatar(

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

        onClick={updateProfile}

        style={{

          background: "blue",

          color: "white",

          border: "none",

          padding: "12px 20px",

          borderRadius: "8px"

        }}

      >

        Save Profile

      </button>

    </div>

  );

}

export default Profile;