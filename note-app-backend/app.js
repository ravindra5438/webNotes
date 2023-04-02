import { Server } from "socket.io";
import { config } from "dotenv";

import dbConnect from "./config/dbConnect.js";
import socketController from "./controllers/socket.js";

config();
dbConnect();


const port = process.env.PORT || 5000;

const io = new Server(port, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});


socketController(io);