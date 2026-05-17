require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

// ======================
// APP
// ======================

const app = express();

// ======================
// CORS
// ======================

app.use(

  cors({

    origin: [

      "http://localhost:5173",

      "https://notes-app-mu-hazel.vercel.app"

    ],

    methods: [

      "GET",
      "POST",
      "PUT",
      "DELETE"

    ],

    credentials: true

  })

);

// ======================
// JSON
// ======================

app.use(express.json());

// ======================
// ROUTES
// ======================

const authRoutes =
  require("./routes/authRoutes");

const noteRoutes =
  require("./routes/noteRoutes");

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/notes",
  noteRoutes
);

// ======================
// MONGODB
// ======================

mongoose.connect(

  process.env.MONGO_URI

)

.then(() => {

  console.log(
    "MongoDB Connected"
  );

})

.catch((error) => {

  console.log(error);

});

// ======================
// TEST ROUTE
// ======================

app.get("/", (req, res) => {

  res.send("API Running");

});

// ======================
// PORT
// ======================

const PORT =
  process.env.PORT || 3001;

app.listen(PORT, () => {

  console.log(

    `Server running on port ${PORT}`

  );

});