//module imports
import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import "./config/db.js";
import router from "./routes/index.js";
//creating server instance
const app = express();
const port = 3000;

//adding middleware
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(router);
//routes declaration
app.get("/", (req, res) => res.send("Hello World!"));

//binding to port and host and starting server
const server = app.listen(port, "localhost", () =>
  console.log(`Example app listening on port ${port}!`)
);

const io = new Server(server, { path: "/groupMusic" });

io.on("connection", (socket) => {
  initSocketEvent(socket);
  console.log("new user connected");
});
