const { request } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const pizzas = require("./routers/pizzas");
const users = require ("./routers/users");
const orders = require ("./routers/orders");

const app = express();

// Middleware
const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${Date.now()}`);
  next();
};
// CORS Middleware
const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

app.use(express.json());
app.use(logging);
app.use(cors);
app.use('/pizzas', pizzas);
app.use('/users',users);
app.use('/orders',orders);

// Database stuff
mongoose.connect("mongodb+srv://Shondanishea:Sh@nt1r12@cluster0.dqyoz.mongodb.net/testSpa?retryWrites=true&w=majority");
const db = mongoose.connection;

let db_status = "MongoDB connection not successful.";

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => (db_status = "Successfully opened connection to Mongo!"));




const burritosSchema = new mongoose.Schema({
  size: String,
  meat: String,
  beans: Boolean,
  heat: [String]
});

const Burritos = mongoose.model('Burritos', burritosSchema);

app.post('/burritos', (request, response) => {
  const newBurritos = new Burritos(request.body)
  newBurritos.save((err, burritos) => {
    return err ? response.sendStatus(500).json(err) : response.json(burritos)
  });
});

app.get("/burritos", (request, response) => {
  Burritos.find({}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

app.get("/burritos/:id", (request, response) => {
  Burritos.findById(request.params.id, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});



app.route("/").get((request, response) => {
  response.send("HELLO WORLD");
});

app.get("/status", (request, response) => {
  response.send(JSON.stringify({ message: "Service running ok" }));
});

app
  .route("/posts")
  .get((request, response) => {
    // express adds a "params" Object to requests
    const id = request.params.id;
    let data = "The ID equals " + id;
    // handle GET request for post with an id of "id"
    if (request.query) {
      if (request.query.type) {
        if (request.query.type === "json") {
          data = { id: request.params.id, q: request.query };
        }
      }
    }
    response.status(418).json(data);
  })
  .post((request, response) => {
    response.json(request);
  });

const PORT = process.env.PORT || 4040;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
