require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

// ======================
// ROUTES
// ======================

const authRoutes =
  require("./routes/authRoutes");

const noteRoutes =
  require("./routes/noteRoutes");

// ======================
// APP
// ======================

const app = express();

// ======================
// CORS
// ======================

app.use(cors());

// ======================
// JSON
// ======================

app.use(express.json());

// ======================
// API ROUTES
// ======================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/notes",
  noteRoutes
);

// ======================
// TEST ROUTE
// ======================

app.get("/", (req, res) => {

  res.send("API Running");

});

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
// PORT
// ======================

const PORT =
  process.env.PORT || 3001;

app.listen(PORT, () => {

  console.log(

    `Server running on port ${PORT}`

  );

});