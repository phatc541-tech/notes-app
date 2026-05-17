import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Home() {

  const navigate = useNavigate();

  // ======================
  // STATES
  // ======================

  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [labels, setLabels] = useState("");

  const [search, setSearch] = useState("");

  const [viewMode, setViewMode] = useState("list");

  const [loading, setLoading] = useState(false);

  // ======================
  // TOKEN
  // ======================

  const token = localStorage.getItem("token");

  // ======================
  // GET NOTES
  // ======================

  const getNotes = async () => {

    try {

      const res = await api.get(
        "/notes",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setNotes(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // ======================
  // LOAD NOTES
  // ======================

  useEffect(() => {

    if (!token) {

      navigate("/login");

    } else {

      getNotes();

    }

  }, []);

  // ======================
  // AUTOSAVE
  // ======================

  useEffect(() => {

    if (
      title.trim() === "" &&
      content.trim() === ""
    ) {
      return;
    }

    setLoading(true);

    const timeout = setTimeout(async () => {

      try {

        await api.post(
          "/notes",
          {
            title,
            content,
            labels: labels
              .split(",")
              .map((item) => item.trim())
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        await getNotes();

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);

      }

    }, 1000);

    return () => clearTimeout(timeout);

  }, [title, content]);

  // ======================
  // DELETE NOTE
  // ======================

  const deleteNote = async (id) => {

    try {

      await api.delete(
        `/notes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      getNotes();

    } catch (error) {

      console.log(error);

    }
  };

  // ======================
  // LOGOUT
  // ======================

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  // ======================
  // SEARCH
  // ======================

  const filteredNotes = notes.filter((note) =>

    note.title
      .toLowerCase()
      .includes(search.toLowerCase())

    ||

    note.content
      .toLowerCase()
      .includes(search.toLowerCase())

  );

  return (

    <div
      style={{
        padding: "20px"
      }}
    >

      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >

        <h1>My Notes</h1>

        <button
          onClick={logout}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px"
          }}
        >
          Logout
        </button>

      </div>

      {/* CREATE NOTE */}

      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px"
        }}
      >

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          rows="10"
          style={{
            width: "100%",
            padding: "10px"
          }}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="labels (study,work...)"
          value={labels}
          onChange={(e) =>
            setLabels(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px"
          }}
        />

        <br />
        <br />

        <p>
          {loading
            ? "Auto Saving..."
            : "Saved"}
        </p>

      </div>

      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px"
        }}
      />

      {/* VIEW MODE */}

      <div
        style={{
          marginBottom: "20px"
        }}
      >

        <button
          onClick={() =>
            setViewMode("list")
          }
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px"
          }}
        >
          List
        </button>

        <button
          onClick={() =>
            setViewMode("grid")
          }
          style={{
            background: "#16a34a",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            marginLeft: "10px"
          }}
        >
          Grid
        </button>

      </div>

      {/* NOTES */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            viewMode === "grid"
              ? "repeat(3, 1fr)"
              : "1fr",
          gap: "20px"
        }}
      >

        {

          filteredNotes.length > 0 ? (

            filteredNotes.map((note) => (

              <div
                key={note._id}
                style={{
                  border: "1px solid #ccc",
                  padding: "15px",
                  borderRadius: "10px"
                }}
              >

                <h2>
                  {note.title}
                </h2>

                <p>
                  {note.content}
                </p>

                <div>

                  {

                    note.labels?.map(
                      (label) => (

                        <span
                          key={label}
                          style={{
                            background: "#ddd",
                            padding: "5px 10px",
                            borderRadius: "20px",
                            marginRight: "10px"
                          }}
                        >
                          {label}
                        </span>

                      )
                    )

                  }

                </div>

                <br />

                <button
                  onClick={() =>
                    deleteNote(note._id)
                  }
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "5px"
                  }}
                >
                  Delete
                </button>

              </div>

            ))

          ) : (

            <p>No notes found</p>

          )

        }

      </div>

    </div>
  );
}

export default Home;