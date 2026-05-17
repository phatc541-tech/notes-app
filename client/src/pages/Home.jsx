import {

  useEffect,
  useState

} from "react";

import {

  useNavigate

} from "react-router-dom";

import api from "../services/api";

function Home() {

  const navigate =
    useNavigate();

  // ======================
  // STATES
  // ======================

  const [notes, setNotes] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [labels, setLabels] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [viewMode, setViewMode] =
    useState("grid");

  const [editingId, setEditingId] =
    useState(null);

  // ======================
  // FETCH NOTES
  // ======================

  const fetchNotes = async () => {

    try {

      const res =
        await api.get("/notes");

      setNotes(res.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchNotes();

  }, []);

  // ======================
  // SAVE NOTE
  // ======================

  const saveNote = async () => {

    try {

      // empty check

      if (

        !title.trim() ||
        !content.trim()

      ) {

        alert(

          "Please enter title and content"

        );

        return;

      }

      // ======================
      // UPDATE NOTE
      // ======================

      if (editingId) {

        const res =

          await api.put(

            `/notes/${editingId}`,

            {

              title,
              content,
              labels

            }

          );

        setNotes(

          notes.map((note) =>

            note._id === editingId

              ? res.data

              : note

          )

        );

      }

      // ======================
      // CREATE NOTE
      // ======================

      else {

        const res =

          await api.post(

            "/notes",

            {

              title,
              content,
              labels

            }

          );

        console.log(res.data);

        // add new note

        setNotes((prev) => [

          res.data,

          ...prev

        ]);

      }

      // clear form

      setTitle("");

      setContent("");

      setLabels("");

      setEditingId(null);

    }

    catch (error) {

      console.log(error);

      console.log(

        error.response

      );

      alert(

        error.response?.data?.message ||

        "Save note failed"

      );

    }

  };

  // ======================
  // DELETE NOTE
  // ======================

  const deleteNote = async (id) => {

    try {

      await api.delete(

        `/notes/${id}`

      );

      setNotes(

        notes.filter(

          (note) =>

            note._id !== id

        )

      );

    }

    catch (error) {

      console.log(error);

    }

  };

  // ======================
  // EDIT NOTE
  // ======================

  const editNote = (note) => {

    setTitle(note.title);

    setContent(note.content);

    setLabels(note.labels);

    setEditingId(note._id);

    window.scrollTo({

      top: 0,
      behavior: "smooth"

    });

  };

  // ======================
  // LOGOUT
  // ======================

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    navigate("/login");

  };

  // ======================
  // SEARCH
  // ======================

  const filteredNotes =
    notes.filter((note) =>

      note.title
        ?.toLowerCase()
        .includes(

          search.toLowerCase()

        )

    );

  return (

    <div

      style={{

        padding: "20px",

        background: "#f5f5f5",

        minHeight: "100vh"

      }}

    >

      {/* HEADER */}

      <div

        style={{

          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center",

          marginBottom: "20px"

        }}

      >

        <h1>

          My Notes

        </h1>

        <button

          onClick={logout}

          style={{

            background: "red",

            color: "white",

            border: "none",

            padding: "12px 18px",

            borderRadius: "8px",

            cursor: "pointer",

            fontWeight: "bold"

          }}

        >

          Logout

        </button>

      </div>

      {/* FORM */}

      <div

        style={{

          background: "white",

          padding: "20px",

          borderRadius: "12px",

          marginBottom: "20px",

          boxShadow:
            "0 0 10px rgba(0,0,0,0.1)"

        }}

      >

        <input

          type="text"

          placeholder="Title"

          value={title}

          onChange={(e) =>

            setTitle(
              e.target.value
            )

          }

          style={{

            width: "100%",

            padding: "12px",

            marginBottom: "10px",

            borderRadius: "8px",

            border:
              "1px solid #ccc"

          }}

        />

        <textarea

          placeholder="Content"

          value={content}

          onChange={(e) =>

            setContent(
              e.target.value
            )

          }

          style={{

            width: "100%",

            height: "150px",

            padding: "12px",

            marginBottom: "10px",

            borderRadius: "8px",

            border:
              "1px solid #ccc"

          }}

        />

        <input

          type="text"

          placeholder="Labels"

          value={labels}

          onChange={(e) =>

            setLabels(
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

        <button

          onClick={saveNote}

          style={{

            background:

              editingId
                ? "orange"
                : "blue",

            color: "white",

            border: "none",

            padding: "12px 20px",

            borderRadius: "8px",

            cursor: "pointer",

            fontWeight: "bold"

          }}

        >

          {

            editingId
              ? "Update Note"
              : "Save Note"

          }

        </button>

      </div>

      {/* SEARCH */}

      <input

        type="text"

        placeholder="Search..."

        value={search}

        onChange={(e) =>

          setSearch(
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

            background:
              viewMode === "list"
                ? "blue"
                : "#999",

            color: "white",

            border: "none",

            padding: "10px 16px",

            borderRadius: "8px",

            marginRight: "10px"

          }}

        >

          List

        </button>

        <button

          onClick={() =>

            setViewMode("grid")

          }

          style={{

            background:
              viewMode === "grid"
                ? "green"
                : "#999",

            color: "white",

            border: "none",

            padding: "10px 16px",

            borderRadius: "8px"

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

              ? "repeat(auto-fit,minmax(250px,1fr))"

              : "1fr",

          gap: "20px"

        }}

      >

        {

          filteredNotes.map((note) => (

            <div

              key={note._id}

              style={{

                background: "white",

                padding: "20px",

                borderRadius: "12px",

                boxShadow:
                  "0 0 10px rgba(0,0,0,0.1)"

              }}

            >

              <h2>

                {note.title}

              </h2>

              <p>

                {note.content}

              </p>

              <p>

                #{note.labels}

              </p>

              <div
                style={{
                  marginTop: "15px"
                }}
              >

                <button

                  onClick={() =>

                    editNote(note)

                  }

                  style={{

                    background:
                      "orange",

                    color: "white",

                    border: "none",

                    padding:
                      "10px 15px",

                    borderRadius:
                      "8px",

                    marginRight:
                      "10px"

                  }}

                >

                  Edit

                </button>

                <button

                  onClick={() =>

                    deleteNote(
                      note._id
                    )

                  }

                  style={{

                    background:
                      "red",

                    color: "white",

                    border: "none",

                    padding:
                      "10px 15px",

                    borderRadius:
                      "8px"

                  }}

                >

                  Delete

                </button>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default Home;