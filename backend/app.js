//core module
const path = require("path");
require("dotenv").config();

//External module
const express = require("express");
const DB_PATH = process.env.MONGODB_URI;
const cors = require("cors");

//local module
const todoitemsRouter = require("./routes/todoitemsRouter");
const errorController = require("./controllers/errorController");

const rootDir = require("./utils/pathUtils");

const { default: mongoose } = require("mongoose");

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use("/api/todoitems", todoitemsRouter);
app.use(errorController.errorHandler);

const PORT = 3000;

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("connected to Mongo");

    app.listen(PORT, () => {
      console.log(`server is running at port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error while connecting Mongo: ", err);
  });
