//module imports
import express from "express";
import cors from "cors";

//creating server instance
const app = express();
const port = 3000;

//adding middleware
app.use(cors({ origin: "*" }));

//routes declaration
app.get("/", (req, res) => res.send("Hello World!"));

//binding to port and host and starting server
app.listen(port, "localhost", () =>
  console.log(`Example app listening on port ${port}!`)
);
