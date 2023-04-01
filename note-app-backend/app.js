import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { config } from "dotenv";

import dbConnect from "./config/dbConnect.js";
import noteRoutes from "./routes/note.js";
import socketController from "./controllers/socket.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

config();
dbConnect();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is working" });
});

socketController(io);
app.use("/api/v1/note", noteRoutes);

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server Listening on port ${port}...`));
