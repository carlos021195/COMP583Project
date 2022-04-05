const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const authRoute = require("./routes/auth");
const convoRoute = require("./routes/conversations");
const messageRoute = require("./routes/message");
const usersRoute = require("./routes/users");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 3000

app.use(cors());

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/conversations", convoRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", usersRoute)

app.listen(port, () => {
  console.log("Backend server is running!");
});

