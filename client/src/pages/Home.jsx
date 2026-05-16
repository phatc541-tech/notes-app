import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

function Home() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [notes, setNotes] = useState([]);

  const [search, setSearch] = useState("");

  const [view, setView] = useState("list");

  const [editId, setEditId] = useState(null);

  // =========================
  // GET NOTES
  // =========================
  const getNotes = async () => {

    try {

      const res = await api.get("/notes");

      setNotes(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // =========================
  // AUTO SAVE
  // =========================
  useEffect(() => {

    if (!title && !content) return;

    const timeout = setTimeout(async () => {

      try {

        // UPDATE
        if (editId) {

          await api.put(`/notes/${editId}`, {

            title,
            content

          });

          console.log("Note Updated");

        }

        // CREATE
        else {

          const res = await api.post("/notes", {

            title,
            content

          });

          console.log("Note Added");

          setEditId(res.data._id);

        }

        getNotes();

      } catch (error) {

        console.log(error);

      }

    }, 1000);

    return () => clearTimeout(timeout);

  }, [title, content]);

  // =========================
  // DELETE NOTE
  // =========================
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure to delete this note?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`/notes/${id}`);

      alert("Note Deleted");

      getNotes();

    } catch (error) {

      console.log(error);

    }
  };

  // =========================
  // PIN NOTE
  // =========================
  const handlePin = async (id) => {

    try {

      await api.put(`/notes/pin/${id}`);

      getNotes();

    } catch (error) {

      console.log(error);

    }
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {

    localStorage.removeItem("token");

    alert("Logout Success");

    navigate("/login");

  };

  // =========================
  // CHECK LOGIN
  // =========================
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      navigate("/login");

    }

    else {

      getNotes();

    }

  }, []);

  // =========================
  // SEARCH
  // =========================
  const filteredNotes = notes.filter((note) =>

    note.title.toLowerCase().includes(
      search.toLowerCase()
    ) ||

    note.content.toLowerCase().includes(
      search.toLowerCase()
    )

  );

  return (

    <div

      style={{

        padding: "20px",

        maxWidth: "1200px",

        margin: "auto"

      }}

    >

      <h1>My Notes</h1>

      {/* logout */}
      <button onClick={handleLogout}>
        Logout
      </button>

      <br />
      <br />

      {/* title */}
      <input

        type="text"

        style={{

          width: "100%",

          padding: "10px",

          boxSizing: "border-box"

        }}

        placeholder="Title"

        value={title}

        onChange={(e) =>
          setTitle(e.target.value)
        }

      />

      <br />
      <br />

      {/* content */}
      <textarea

        style={{

          width: "100%",

          minHeight: "120px",

          padding: "10px",

          boxSizing: "border-box"

        }}

        placeholder="Content"

        value={content}

        onChange={(e) =>
          setContent(e.target.value)
        }

      />

      <br />
      <br />

      <p>
        Auto Saving...
      </p>

      <hr />

      {/* search */}
      <input

        type="text"

        style={{

          width: "100%",

          padding: "10px",

          boxSizing: "border-box"

        }}

        placeholder="Search notes..."

        value={search}

        onChange={(e) =>
          setSearch(e.target.value)
        }

      />

      <br />
      <br />

      {/* view buttons */}
      <button
        onClick={() => setView("list")}
      >
        List View
      </button>

      <button
        onClick={() => setView("grid")}
      >
        Grid View
      </button>

      <br />
      <br />

      {/* empty */}
      {
        filteredNotes.length === 0 && (

          <p>
            No notes found
          </p>

        )
      }

      {/* notes */}
      <div

        style={{

          display: "grid",

          gridTemplateColumns:

            view === "grid"

              ? "repeat(auto-fit, minmax(250px, 1fr))"

              : "repeat(1, 1fr)",

          gap: "20px"

        }}

      >

        {
          filteredNotes.map((note) => (

            <div

              key={note._id}

              style={{

                border: "1px solid gray",

                padding: "15px",

                borderRadius: "10px",

                backgroundColor: "#f5f5f5"

              }}

            >

              <h3>

                {
                  note.isPinned
                    ? "📌 "
                    : ""
                }

                {note.title}

              </h3>

              <p>{note.content}</p>

              {/* delete */}
              <button
                onClick={() =>
                  handleDelete(note._id)
                }
              >
                Delete
              </button>

              {/* edit */}
              <button
                onClick={() => {

                  setEditId(note._id);

                  setTitle(note.title);

                  setContent(note.content);

                }}
              >
                Edit
              </button>

              {/* pin */}
              <button
                onClick={() =>
                  handlePin(note._id)
                }
              >
                {
                  note.isPinned
                    ? "Unpin"
                    : "Pin"
                }
              </button>

            </div>

          ))
        }

      </div>

    </div>
  );
}

export default Home;