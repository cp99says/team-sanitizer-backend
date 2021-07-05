const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const mongoose = require("mongoose");
const profile = require("./routes/routes");

app.use(cors());
app.get("/", (req, res) => {
  res.send("hello aws");
});

//routes
app.use("/api/", profile);

const PORT = 3500;
app.listen(PORT, () => {
  console.log(`server started at port: ${PORT}`);
});
