// const express = require("express");
// const morgan = require("morgan");
// const dotenv = require("dotenv");
// const cors = require("cors");

// dotenv.config();
// const sync = require("./models/sync.js");
// sync();
// const port = process.env.PORT || 3000;

// const app = express();

// socket server
// const http = require("http");
// const socketIO = require("socket.io");
// const server = http.createServer(app);

// socketIO instance 생성 
// const io = socketIO(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//     credentials: true,
//     allowedHeaders: ["Access-Control-Allow-Origin:http://localhost:3000"],
//   },
// });

// const auth_router = require("./routes/auth_router.js");
// const trade_router = require("./routes/trade_router.js");
// const request_router = require("./routes/request_router.js");
// const { addHook } = require("./models/User.js");
// const isAuth = require('./routes/authorization.js');
// app.use(morgan("dev"));
// app.use(express.json());

// app.use(cookieParser()); // cookie version
// app.use(
//   cors({
//     origin: "*",
// credentials: true, // Add this line to allow credentials (cookies) to be sent
//   })
// );

// socket 연결
// io.on("connection", (socket) => {
//   console.log(`⚡: ${socket.id} user just connected!`);

// Listen for 'message' events
// socket.on('message', (message) => {
// Broadcast the message to all connected clients
//   io.emit('message', message);
//   console.log(message)
// });

//   socket.on("disconnect", () => {
//     console.log("🔥: A user disconnected");
//   });
// });

// app.get("/", (req, res) => {
//   res.send("hello");
// });

// app.use('/posts', isAuth,  trade_router);
// app.use("/request", request_router);
// app.use("/trade", trade_router);
// app.use("/auth", auth_router);

// app.listen(port);

// socket 실행
// server.listen(port, () => {
//   console.log(`Socket IO server listening on port ${port}`);
// });
