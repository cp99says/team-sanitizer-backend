const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const mongoose = require("mongoose");
const profile = require("./routes/routes");
const swaggerUi = require('swagger-ui-express');
const yamljs = require('yamljs')
const swaggerDocs=yamljs.load('./swagger.yaml')


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose.connect(
  "mongodb+srv://chetan:hackRx123@cluster0.52tae.mongodb.net/sanitizer?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:true },
  () => {
    console.log('connected to mongoDB atlas');
  }
);
// mongoose.connect(
//   "mongodb://localhost:27017/HackRx2",
//   { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:true },
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
  console.log(`server started at port : ${PORT}`);
});

