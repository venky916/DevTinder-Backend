const express = require("express");
const connectDB = require("./config/database");

const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const connectionRouter = require("./routes/connectionRouter");
const userRouter = require("./routes/userRouter");
const chatRouter = require("./routes/chat");

const http = require("http");
const initializeSocket = require("../utils/socket");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://dev-tinder-web-delta.vercel.app/",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

const server = http.createServer(app);
initializeSocket(server);

connectDB()
  .then(() => {
    console.log("Connected to Database successfully....");
    server.listen(3000, () => {
      console.log("successfully listening on port 3000 ....!");
    });
  })
  .catch(() => {
    console.error("Error in connecting to database");
  });
