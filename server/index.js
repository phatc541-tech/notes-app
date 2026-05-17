const cors = require("cors");
const express = require("express")
const mongoose = require("mongoose")

require("dotenv").config()

// ROUTES
const authRoutes = require("./routes/authRoutes")
const noteRoutes = require("./routes/noteRoutes")

const app = express();
app.use(

  cors({

    origin: "*",

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE"
    ],

    credentials: true

  })

);

// MIDDLEWARE
app.use(express.json())

// CHECK ENV
console.log(process.env.MONGO_URI)

// DATABASE
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected")
})
.catch((err) => {
  console.log(err)
})

// ROUTES
app.use("/api/auth", authRoutes)

app.use("/api/notes", noteRoutes)

// TEST
app.get("/", (req, res) => {
  res.send("Server Running")
})

// SERVER
app.listen(3001, () => {
  console.log("Server running on port 3001")
})