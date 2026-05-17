import { useEffect, useState } from "react";
import api from "../services/api";

function Home() {

  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [labels, setLabels] = useState("");

  const [search, setSearch] = useState("");

  const [viewMode, setViewMode] = useState("grid");

  // ======================
  // FETCH NOTES
  // ======================

  const fetchNotes = async () => {

    try {

      const res = await api.get("/notes");

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
  // CREATE NOTE
  // ======================

  const createNote = async () => {

    try {

      await api.post("/notes", {

        title,
        content,
        labels

      });

      setTitle("");
      setContent("");
      setLabels("");

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

      await api.delete(`/notes/${id}`);

      fetchNotes();

    }

    catch (error) {

      console.log(error);

    }

  };

  // ======================
  // UPDATE NOTE
  // ======================

  const updateNote = async (

    id,
    oldTitle

  ) => {

    const newTitle = prompt(

      "Edit title",
      oldTitle

    );

    if (!newTitle) return;

    try {

      await api.put(

        `/notes/${id}`,

        {

          title: newTitle

        }

      );

      fetchNotes();

    }

    catch (error) {

      console.log(error);

    }

  };

  // ======================
  // SEARCH
  // ======================

  const filteredNotes = notes.filter((note) =>

    note.title
      ?.toLowerCase()
      .includes(

        search.toLowerCase()

      )

  );

  return (

    <div style={{ padding: "20px" }}>

      {/* HEADER */}

      <div

        style={{

          display: "flex",

          justifyContent: "space-between",

          alignItems: "center",

          marginBottom: "20px"

        }}

      >

        <h1>My Notes</h1>

        <button

          onClick={() => {

            localStorage.removeItem("token");

            window.location.href = "/login";

          }}

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

            setLabels(e.target.value)

          }

          style={{

            width: "100%",

            padding: "10px",

            marginBottom: "10px"

          }}

        />

        <button

          onClick={createNote}

          style={{

            background: "green",

            color: "white",

            border: "none",

            padding: "10px",

            borderRadius: "5px"

          }}

        >

          Save

        </button>

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

      {/* VIEW BUTTON */}

      <div style={{ marginBottom: "20px" }}>

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

            background: "green",

            color: "white",

            border: "none",

            padding: "10px",

            borderRadius: "5px"

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

        {filteredNotes.map((note) => (

          <div

            key={note._id}

            style={{

              border: "1px solid #ccc",

              padding: "15px",

              borderRadius: "10px"

            }}

          >

            <h2>{note.title}</h2>

            <p>{note.content}</p>

            <p>{note.labels}</p>

            {/* EDIT */}

            <button

              onClick={() =>

                updateNote(

                  note._id,
                  note.title

                )

              }

              style={{

                background: "orange",

                color: "white",

                border: "none",

                padding: "10px",

                borderRadius: "5px",

                marginRight: "10px"

              }}

            >

              Edit

            </button>

            {/* DELETE */}

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

        ))}

      </div>

    </div>

  );

}

export default Home;