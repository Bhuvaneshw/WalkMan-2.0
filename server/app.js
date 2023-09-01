//module imports
import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import "./config/db.js";
import router from "./routes/index.js";
import initSocketEvent from "./domain/groupMusic/socketEvents.js";
//creating server instance
const app = express();
const port = 3000;

//adding middleware
app.use(express.json());
app.use("/assets", express.static("static"));
app.use(cors({ origin: "*", methods: ["GET", "POST"] }));
app.use(router);
//routes declaration
app.get("/", (req, res) => res.send("Hello World!"));

//binding to port and host and starting server
const server = app.listen(port, () =>
  console.log(`Walkman 2.0 Server listening on port ${port}!`)
);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

initSocketEvent(io);
