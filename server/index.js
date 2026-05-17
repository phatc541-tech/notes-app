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

const authRoutes = require(

  "./routes/authRoutes"

);

const noteRoutes = require(

  "./routes/noteRoutes"

);

app.use(

  "/api/auth",

  authRoutes

);

app.use(

  "/api/notes",

  noteRoutes

);

// ======================
// TEST
// ======================

app.get("/", (req, res) => {

  res.send(

    "API Running"

  );

});

// ======================
// DATABASE
// ======================

mongoose.connect(

  process.env.MONGO_URI

)

.then(() => {

  console.log(

    "MongoDB Connected"

  );

  app.listen(

    process.env.PORT || 3001,

    () => {

      console.log(

        "Server Running"

      );

    }

  );

})

.catch((error) => {

  console.log(error);

});