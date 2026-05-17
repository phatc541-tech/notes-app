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

      // UPDATE

      if (editingId) {

        await api.put(

          `/notes/${editingId}`,

          {

            title,
            content,
            labels

          }

        );

        fetchNotes();

      }

      // CREATE

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

        // hiện note mới ngay

        setNotes((prev) => [

          res.data,

          ...prev

        ]);

      }

    }

    catch (error) {

      console.log(error);

    }

  };

  // ======================
  // AUTO SAVE
  // ======================

  useEffect(() => {

    // không autosave nếu trống

    if (

      !title.trim() &&
      !content.trim()

    ) return;

    const delay = setTimeout(() => {

      saveNote();

    }, 2000);

    return () =>

      clearTimeout(delay);

  }, [

    title,
    content,
    labels

  ]);

  // ======================
  // DELETE NOTE
  // ======================

  const deleteNote = async (id) => {

    try {

      await api.delete(

        `/notes/${id}`

      );

      fetchNotes();

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

            padding: "10px",

            borderRadius: "5px",

            cursor: "pointer"

          }}

        >

          Logout

        </button>

      </div>

      {/* CREATE NOTE */}

      <div

        style={{

          background: "white",

          padding: "20px",

          borderRadius: "10px",

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

            padding: "10px",

            marginBottom: "10px",

            borderRadius: "5px",

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

            padding: "10px",

            marginBottom: "10px",

            borderRadius: "5px",

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

            padding: "10px",

            marginBottom: "10px",

            borderRadius: "5px",

            border:
              "1px solid #ccc"

          }}

        />

        <p
          style={{
            color: "gray"
          }}
        >

          Auto saving...

        </p>

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

          padding: "10px",

          marginBottom: "20px",

          borderRadius: "5px",

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

            background: "blue",

            color: "white",

            border: "none",

            padding: "10px",

            borderRadius: "5px",

            marginRight: "10px",

            cursor: "pointer"

          }}

        >

          List

        </button>

        <button

          onClick={() =>

            setViewMode("grid")

          }

          style={{

            background: "green",

            color: "white",

            border: "none",

            padding: "10px",

            borderRadius: "5px",

            cursor: "pointer"

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

        {filteredNotes.map((note) => (

          <div

            key={note._id}

            style={{

              background: "white",

              padding: "15px",

              borderRadius: "10px",

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

            {/* BUTTONS */}

            <div
              style={{
                marginTop: "10px"
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

                  padding: "10px",

                  borderRadius: "5px",

                  marginRight: "10px",

                  cursor: "pointer"

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

                  background: "red",

                  color: "white",

                  border: "none",

                  padding: "10px",

                  borderRadius: "5px",

                  cursor: "pointer"

                }}

              >

                Delete

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Home;