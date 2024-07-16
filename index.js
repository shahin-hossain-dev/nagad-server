const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = 3000;

// middleware

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("nagad islamic server running");
});

// mongo db

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kdwhpbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //

    // user create
    app.post("/register", async (req, res) => {
      const user = req.body;
      const saltRounds = 10;
      const pin = user.pin;

      bcrypt.hash(pin, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        console.log(hash);
      });

      res.send({ message: "registered" });
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`nagad-server is running port on ${port}`);
});
