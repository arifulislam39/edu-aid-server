const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

//middle ware here
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("eduAid server is running");
  });
  
  app.listen(port, () => {
    console.log(`eduAid server running on port ${port}`);
  });