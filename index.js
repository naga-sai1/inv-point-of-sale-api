import express from "express";

import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

const PORT = process.env.PORT || 3123;

app.get("/", (req, res) => {
  res.send("Hello this is a inv pos server API");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

server.listen(3000, () => {
  console.log("Socket.io server is running on port 3000");
});
