import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

function Home() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [notes, setNotes] = useState([]);

  const [search, setSearch] = useState("");

  const [view, setView] = useState("grid");

  const [editId, setEditId] = useState(null);

  // get notes
  const getNotes = async () => {

    try {

      const res = await api.get("/notes");

      setNotes(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // autosave
  useEffect(() => {

    if (!title && !content) return;

    const timeout = setTimeout(async () => {

      try {

        // update
        if (editId) {

          await api.put(`/notes/${editId}`, {

            title,
            content

          });

          console.log("updated");

        }

        // create
        else {

          const res = await api.post("/notes", {

            title,
            content

          });

          setEditId(res.data._id);

          console.log("created");

        }

        getNotes();

      } catch (error) {

        console.log(error);

      }

    }, 1000);

    return () => clearTimeout(timeout);

  }, [title, content]);

  // delete
  const handleDelete = async (id) => {

    const ok = window.confirm(
      "Delete this note?"
    );

    if (!ok) return;

    try {

      await api.delete(`/notes/${id}`);

      getNotes();

    } catch (error) {

      console.log(error);

    }
  };

  // pin
  const handlePin = async (id) => {

    try {

      await api.put(`/notes/pin/${id}`);

      getNotes();

    } catch (error) {

      console.log(error);

    }
  };

  // logout
  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  // check login
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      navigate("/login");

    }

    else {

      getNotes();

    }

  }, []);

  // search
  const filteredNotes = notes.filter((item) =>

    item.title.toLowerCase().includes(
      search.toLowerCase()
    ) ||

    item.content.toLowerCase().includes(
      search.toLowerCase()
    )

  );

  return (

    <div className="bg-gray-100 min-h-screen p-5">

      <div className="max-w-6xl mx-auto">

        {/* top */}
        <div className="flex justify-between items-center mb-5">

          <h1 className="text-4xl font-bold">
            My Notes
          </h1>

          <button

            onClick={handleLogout}

            className="
              bg-red-500
              text-white
              p-2
              rounded
            "
          >
            Logout
          </button>

        </div>

        {/* create */}
        <div className="bg-white p-5 rounded shadow mb-5">

          <input

            type="text"

            placeholder="Title"

            value={title}

            onChange={(e) =>
              setTitle(e.target.value)
            }

            className="
              w-full
              border
              p-3
              rounded
              mb-3
            "

          />

          <textarea

            placeholder="Content"

            value={content}

            onChange={(e) =>
              setContent(e.target.value)
            }

            className="
              w-full
              border
              p-3
              rounded
              h-40
            "

          />

          <p className="text-gray-500 mt-2">
            Auto Saving...
          </p>

        </div>

        {/* search */}
        <input

          type="text"

          placeholder="Search..."

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

          className="
            w-full
            border
            p-3
            rounded
            mb-5
          "

        />

        {/* buttons */}
        <div className="mb-5">

          <button

            onClick={() => setView("list")}

            className="
              bg-blue-500
              text-white
              p-2
              rounded
              mr-2
            "
          >
            List
          </button>

          <button

            onClick={() => setView("grid")}

            className="
              bg-green-500
              text-white
              p-2
              rounded
            "
          >
            Grid
          </button>

        </div>

        {/* empty */}
        {
          filteredNotes.length === 0 && (

            <p>No notes found</p>

          )
        }

        {/* notes */}
        <div

          className={

            view === "grid"

              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-5"

              : "grid grid-cols-1 gap-5"

          }

        >

          {
            filteredNotes.map((item) => (

              <div

                key={item._id}

                className="
                  bg-white
                  p-5
                  rounded
                  shadow
                "

              >

                <h2 className="text-2xl font-bold mb-3">

                  {
                    item.isPinned
                      ? "📌 "
                      : ""
                  }

                  {item.title}

                </h2>

                <p className="text-gray-600">
                  {item.content}
                </p>

                <div className="mt-5 flex gap-2 flex-wrap">

                  {/* delete */}
                  <button

                    onClick={() =>
                      handleDelete(item._id)
                    }

                    className="
                      bg-red-500
                      text-white
                      p-2
                      rounded
                    "

                  >
                    Delete
                  </button>

                  {/* edit */}
                  <button

                    onClick={() => {

                      setEditId(item._id);

                      setTitle(item.title);

                      setContent(item.content);

                    }}

                    className="
                      bg-yellow-500
                      text-white
                      p-2
                      rounded
                    "

                  >
                    Edit
                  </button>

                  {/* pin */}
                  <button

                    onClick={() =>
                      handlePin(item._id)
                    }

                    className="
                      bg-blue-500
                      text-white
                      p-2
                      rounded
                    "

                  >
                    {
                      item.isPinned
                        ? "Unpin"
                        : "Pin"
                    }
                  </button>

                </div>

              </div>

            ))
          }

        </div>

      </div>

    </div>
  );
}

export default Home;