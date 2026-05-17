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

  const [oldPassword, setOldPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  // ======================
  // FETCH PROFILE
  // ======================

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

      alert(

        "Failed to load profile"

      );

    }

  };

  // ======================
  // UPDATE PROFILE
  // ======================

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

      alert(

        "Update failed"

      );

    }

  };

  // ======================
  // CHANGE PASSWORD
  // ======================

  const changePassword = async () => {

    try {

      await api.put(

        "/auth/change-password",

        {

          oldPassword,
          newPassword

        }

      );

      alert(

        "Password changed"

      );

      setOldPassword("");

      setNewPassword("");

    }

    catch (error) {

      console.log(error);

      alert(

        "Change password failed"

      );

    }

  };

  // ======================
  // ACTIVATE ACCOUNT
  // ======================

  const activateAccount = async () => {

    try {

      await api.put(

        "/auth/activate"

      );

      alert(

        "Account activated"

      );

      fetchProfile();

    }

    catch (error) {

      console.log(error);

      alert(

        "Activation failed"

      );

    }

  };

  // ======================
  // LOADING
  // ======================

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

      {/* STATUS */}

      <p>

        Status:

        {" "}

        {

          user?.isActivated

            ? "✅ Activated"

            : "❌ Not Activated"

        }

      </p>

      {

        !user?.isActivated && (

          <button

            onClick={activateAccount}

            style={{

              background: "green",

              color: "white",

              border: "none",

              padding: "12px 20px",

              borderRadius: "8px",

              cursor: "pointer",

              marginBottom: "20px"

            }}

          >

            Activate Account

          </button>

        )

      }

      {/* AVATAR */}

      <img

        src={avatar}

        alt="avatar"

        width="150"

        height="150"

        style={{

          borderRadius: "50%",

          objectFit: "cover",

          marginBottom: "20px"

        }}

      />

      {/* USERNAME */}

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

          marginBottom: "10px"

        }}

      />

      {/* AVATAR URL */}

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

      {/* SAVE PROFILE */}

      <button

        onClick={updateProfile}

        style={{

          background: "blue",

          color: "white",

          border: "none",

          padding: "12px 20px",

          borderRadius: "8px",

          cursor: "pointer",

          marginBottom: "40px"

        }}

      >

        Save Profile

      </button>

      {/* CHANGE PASSWORD */}

      <h2>

        Change Password

      </h2>

      <input

        type="password"

        placeholder="Old Password"

        value={oldPassword}

        onChange={(e) =>

          setOldPassword(

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

        type="password"

        placeholder="New Password"

        value={newPassword}

        onChange={(e) =>

          setNewPassword(

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

        onClick={changePassword}

        style={{

          background: "orange",

          color: "white",

          border: "none",

          padding: "12px 20px",

          borderRadius: "8px",

          cursor: "pointer"

        }}

      >

        Change Password

      </button>

    </div>

  );

}

export default Profile;