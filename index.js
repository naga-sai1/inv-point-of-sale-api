import express from "express";
import bodyParser from "body-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import cors from "cors";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

import authRoute from "./routes/auth.route.js";
import storesRoute from "./routes/stores.route.js";
import brandRoute from "./routes/brand.route.js";

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

app.use(authRoute);
app.use(storesRoute);
app.use(brandRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.listen(3000, () => {
  console.log("Socket.io server is running on port 3000");
});
