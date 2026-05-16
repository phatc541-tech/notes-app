import { useEffect, useState } from "react";

import api from "../services/api";

function Home() {

  // =========================
  // STATES
  // =========================

  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [labels, setLabels] = useState("");

  const [search, setSearch] = useState("");

  const [selectedLabel, setSelectedLabel] = useState("");

  const [viewMode, setViewMode] = useState("list");

  const [loading, setLoading] = useState(false);

  // =========================
  // TOKEN
  // =========================

  const token = localStorage.getItem("token");

  // =========================
  // GET NOTES
  // =========================

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

  // =========================
  // AUTO SAVE
  // =========================

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

        getNotes();

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);

      }

    }, 1000);

    return () => clearTimeout(timeout);

  }, [title, content, labels]);

  // =========================
  // DELETE NOTE
  // =========================

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

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  // =========================
  // LOAD NOTES
  // =========================

  useEffect(() => {

    getNotes();

  }, []);

  // =========================
  // FILTER NOTES
  // =========================

  const filteredNotes = notes.filter((note) => {

    const matchSearch =

      note.title
        .toLowerCase()
        .includes(search.toLowerCase())

      ||

      note.content
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchLabel =

      selectedLabel === ""

      ||

      note.labels?.includes(selectedLabel);

    return matchSearch && matchLabel;
  });

  // =========================
  // UNIQUE LABELS
  // =========================

  const allLabels = [

    ...new Set(
      notes.flatMap(
        (note) => note.labels || []
      )
    )

  ];

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
          onClick={handleLogout}
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

        {
          loading
            ? <p>Auto Saving...</p>
            : <p>Saved</p>
        }

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

      {/* LABEL FILTER */}

      <div
        style={{
          marginBottom: "20px"
        }}
      >

        <button
          onClick={() =>
            setSelectedLabel("")
          }
        >
          All
        </button>

        {

          allLabels.map((label) => (

            <button
              key={label}
              onClick={() =>
                setSelectedLabel(label)
              }
              style={{
                marginLeft: "10px"
              }}
            >
              #{label}
            </button>

          ))

        }

      </div>

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
              ? "repeat(3,1fr)"
              : "1fr",

          gap: "20px"
        }}
      >

        {

          filteredNotes.map((note) => (

            <div
              key={note._id}
              style={{
                border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "10px"
              }}
            >

              <h2>{note.title}</h2>

              <p>{note.content}</p>

              {/* LABELS */}

              <div>

                {

                  note.labels?.map((label) => (

                    <span
                      key={label}
                      style={{
                        background: "#eee",
                        padding: "5px 10px",
                        borderRadius: "20px",
                        marginRight: "10px",
                        fontSize: "12px"
                      }}
                    >
                      #{label}
                    </span>

                  ))

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

        }

      </div>

      {

        filteredNotes.length === 0 && (

          <p>No notes found</p>

        )

      }

    </div>
  );
}

export default Home;