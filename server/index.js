const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const app = express();

// ======================
// MIDDLEWARE
// ======================

app.use(cors());

app.use(express.json());

// ======================
// ROUTES
// ======================

app.use(

  "/api/auth",

  require("./routes/authRoutes")

);

app.use(

  "/api/notes",

  require("./routes/noteRoutes")

);

// ======================
// TEST ROUTE
// ======================

app.get("/", (req, res) => {

  res.send("API Running");

});

// ======================
// CONNECT DATABASE
// ======================

mongoose

  .connect(process.env.MONGO_URI)

  .then(() => {

    console.log(

      "MongoDB Connected"

    );

  })

  .catch((error) => {

    console.log(error);

  });

// ======================
// PORT
// ======================

const PORT =

  process.env.PORT ||

  5000;

app.listen(

  PORT,

  () => {

    console.log(

      `Server running on port ${PORT}`

    );

  }

);