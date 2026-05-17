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

      // không save nếu trống

      if (

        !title.trim() &&
        !content.trim()

      ) return;

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

      }

      // CREATE

      else {

        await api.post(

          "/notes",

          {

            title,
            content,
            labels

          }

        );

      }

      // reset

      setTitle("");

      setContent("");

      setLabels("");

      setEditingId(null);

      // reload

      fetchNotes();

    }

    catch (error) {

      console.log(error);

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

            borderRadius: "5px"

          }}

        >

          Logout

        </button>

      </div>

      {/* CREATE */}

      <div

        style={{

          background: "white",

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

            setTitle(
              e.target.value
            )

          }

          onBlur={saveNote}

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

            setContent(
              e.target.value
            )

          }

          onBlur={saveNote}

          style={{

            width: "100%",

            height: "150px",

            padding: "10px",

            marginBottom: "10px"

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

          onBlur={saveNote}

          style={{

            width: "100%",

            padding: "10px"

          }}

        />

        <p>

          Auto save when click outside

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

          marginBottom: "20px"

        }}

      />

      {/* VIEW */}

      <div
        style={{
          marginBottom: "20px"
        }}
      >

        <button

          onClick={() =>

            setViewMode("list")

          }

        >

          List

        </button>

        <button

          onClick={() =>

            setViewMode("grid")

          }

          style={{
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

              borderRadius: "10px"

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

            <button

              onClick={() =>

                editNote(note)

              }

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
                marginLeft: "10px"
              }}

            >

              Delete

            </button>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Home;