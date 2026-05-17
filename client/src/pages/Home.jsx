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

  const [darkMode, setDarkMode] =
    useState(false);

  const [isPinned, setIsPinned] =
    useState(false);

  // ======================
  // FETCH NOTES
  // ======================

  const fetchNotes = async () => {

    try {

      const res =

        await api.get(

          "/notes"

        );

      setNotes(res.data);

      // ======================
      // SAVE OFFLINE
      // ======================

      localStorage.setItem(

        "offline_notes",

        JSON.stringify(

          res.data

        )

      );

    }

    catch (error) {

      console.log(error);

      // ======================
      // LOAD OFFLINE
      // ======================

      const offlineNotes =

        JSON.parse(

          localStorage.getItem(

            "offline_notes"

          )

        );

      if (offlineNotes) {

        setNotes(

          offlineNotes

        );

      }

    }

  };

  // ======================
  // REALTIME
  // ======================

  useEffect(() => {

    fetchNotes();

    const interval =

      setInterval(

        fetchNotes,

        3000

      );

    return () =>

      clearInterval(interval);

  }, []);

  // ======================
  // SAVE NOTE
  // ======================

  const saveNote = async () => {

    try {

      if (

        !title.trim() ||

        !content.trim()

      ) {

        alert(

          "Please enter title and content"

        );

        return;

      }

      // UPDATE

      if (editingId) {

        const res =

          await api.put(

            `/notes/${editingId}`,

            {

              title,
              content,
              labels,
              isPinned

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

      // CREATE

      else {

        const res =

          await api.post(

            "/notes",

            {

              title,
              content,
              labels,
              isPinned

            }

          );

        setNotes((prev) => [

          res.data,
          ...prev

        ]);

      }

      // CLEAR FORM

      setTitle("");

      setContent("");

      setLabels("");

      setEditingId(null);

      setIsPinned(false);

    }

    catch (error) {

      console.log(error);

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

    setIsPinned(note.isPinned);

    window.scrollTo({

      top: 0,
      behavior: "smooth"

    });

  };

  // ======================
  // SHARE NOTE
  // ======================

  const shareNote = (id) => {

    const shareLink =

      `${window.location.origin}/share/${id}`;

    navigator.clipboard.writeText(

      shareLink

    );

    alert(

      "Share link copied"

    );

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
  // FILTER NOTES
  // ======================

  const filteredNotes =

    [...notes]

      .sort(

        (a, b) =>

          b.isPinned -

          a.isPinned

      )

      .filter((note) =>

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

        maxWidth: "1200px",

        margin: "0 auto",

        background:

          darkMode
            ? "#121212"
            : "#f5f5f5",

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

        <h1

          style={{

            color:

              darkMode
                ? "white"
                : "black"

          }}

        >

          My Notes

        </h1>

        <div>

          <button

            onClick={() =>

              navigate("/profile")

            }

            style={{

              background: "purple",

              color: "white",

              border: "none",

              padding: "12px 18px",

              borderRadius: "8px",

              marginRight: "10px",

              cursor: "pointer"

            }}

          >

            Profile

          </button>

          <button

            onClick={() =>

              setDarkMode(

                !darkMode

              )

            }

            style={{

              background:

                darkMode
                  ? "#333"
                  : "black",

              color: "white",

              border: "none",

              padding: "12px 18px",

              borderRadius: "8px",

              marginRight: "10px",

              cursor: "pointer"

            }}

          >

            {

              darkMode
                ? "Light Mode"
                : "Dark Mode"

            }

          </button>

          <button

            onClick={logout}

            style={{

              background: "red",

              color: "white",

              border: "none",

              padding: "12px 18px",

              borderRadius: "8px",

              cursor: "pointer"

            }}

          >

            Logout

          </button>

        </div>

      </div>

      {/* FORM */}

      <div

        style={{

          background:

            darkMode
              ? "#1e1e1e"
              : "white",

          color:

            darkMode
              ? "white"
              : "black",

          padding: "20px",

          borderRadius: "12px",

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

          style={{

            width: "100%",

            padding: "12px",

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

          style={{

            width: "100%",

            height: "150px",

            padding: "12px",

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

          style={{

            width: "100%",

            padding: "12px",

            marginBottom: "15px"

          }}

        />

        <div
          style={{
            marginBottom: "15px"
          }}
        >

          <label>

            <input

              type="checkbox"

              checked={isPinned}

              onChange={(e) =>

                setIsPinned(

                  e.target.checked

                )

              }

            />

            {" "}Pin Note

          </label>

        </div>

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

            borderRadius: "8px"

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

          style={{

            background:
              viewMode === "list"
                ? "blue"
                : "#999",

            color: "white",

            border: "none",

            padding: "10px 16px",

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

            padding: "10px 16px"

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

              ? "repeat(auto-fit,minmax(280px,1fr))"

              : "1fr",

          gap: "20px"

        }}

      >

        {

          filteredNotes.map((note) => (

            <div

              key={note._id}

              style={{

                background:

                  darkMode
                    ? "#1e1e1e"
                    : "white",

                color:

                  darkMode
                    ? "white"
                    : "black",

                padding: "20px",

                borderRadius: "12px"

              }}

            >

              <h2>

                {

                  note.isPinned &&
                  "📌 "

                }

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

                    marginRight:
                      "10px"

                  }}

                >

                  Delete

                </button>

                <button

                  onClick={() =>

                    shareNote(
                      note._id
                    )

                  }

                  style={{

                    background:
                      "green",

                    color: "white",

                    border: "none",

                    padding:
                      "10px 15px"

                  }}

                >

                  Share

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