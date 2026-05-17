import {

  useEffect,
  useState

} from "react";

import {

  useParams

} from "react-router-dom";

import api from "../services/api";

function SharedNote() {

  const { id } =
    useParams();

  const [note, setNote] =
    useState(null);

  useEffect(() => {

    fetchSharedNote();

  }, []);

  const fetchSharedNote = async () => {

    try {

      const res =

        await api.get(

          `/notes/share/${id}`

        );

      setNote(res.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  if (!note) {

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

        maxWidth: "700px",

        margin: "0 auto"

      }}

    >

      <div

        style={{

          background: "white",

          padding: "30px",

          borderRadius: "12px",

          boxShadow:

            "0 0 10px rgba(0,0,0,0.1)"

        }}

      >

        <h1>

          {note.title}

        </h1>

        <p>

          {note.content}

        </p>

        <p>

          #{note.labels}

        </p>

      </div>

    </div>

  );

}

export default SharedNote;