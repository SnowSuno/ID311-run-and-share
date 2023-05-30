import * as process from "process";

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
});
const port = process.env.SERVER_PORT ?? 8000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  console.log("client connected", socket.id);

  socket.on("geolocation.change", data => {
    console.log("location");
  })
});

httpServer.listen(port);
console.log(`Server listening on port ${port}`);
