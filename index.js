const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

//middle ware here
app.use(cors());
app.use(express.json());





const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4bttisu.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    const collegeCollection = client.db("eduaidDB").collection("colleges");
    const researchCollection = client.db("eduaidDB").collection("researches");
    const reviewCollection = client.db("eduaidDB").collection("reviews");

//get 3 colleges
    app.get("/college", async (req, res) => {
        const result = await collegeCollection.find().limit(3).toArray();
        res.send(result);
      });

      //get all colleges
    app.get("/colleges", async (req, res) => {
        const result = await collegeCollection.find().toArray();
        res.send(result);
      });

      //single college
      app.get("/college/:id", async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const query = { _id: new ObjectId(id) };
  
        const result = await collegeCollection.findOne(query);
  
        res.send(result);
        console.log(result);
      });


      app.get("/searchByCollegeName/:text", async (req, res) => {
        const searchName = req.params.text;
        const query = { college_name: { $regex: searchName, $options: "i" } };
        const result = await collegeCollection.find(query).toArray();
        res.send(result);
        console.log(result);
      });



      //get all research paper
      app.get("/researchPaper", async (req, res) => {
        const result = await researchCollection.find().toArray();
        res.send(result);
      });


      //get all reviews
      app.get("/reviews", async (req, res) => {
        const result = await reviewCollection.find().toArray();
        res.send(result);
      });


    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);







app.get("/", (req, res) => {
    res.send("eduAid server is running");
  });
  
  app.listen(port, () => {
    console.log(`eduAid server running on port ${port}`);
  });