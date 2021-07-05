const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const mongoose = require("mongoose");
const profile = require("./routes/routes");
mongoose.connect(
  "mongodb+srv://chetan:hackRx123@cluster0.52tae.mongodb.net/sanitizer?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log(`connected to mongoDB atlas yo yo`);
  }
);
// mongoose.connect(
//   "mongodb://localhost:27017/myapp",
//   { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
//   () => {
//     console.log("connected to mongoDB local");
//   }
// );
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
