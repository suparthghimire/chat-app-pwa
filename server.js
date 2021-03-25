const path = require("path");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const {
  getUsers,
  getUser,
  addUser,
  removeUser,
  createUser,
} = require("./models/User");

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server Started at Port ${PORT}`));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use("/", require("./routes/main"));

io.on("connection", (socket) => {
  socket.on("userConnected", ({ uname }) => {
    let user = createUser(uname, socket.id);
    addUser(user);
    socket.broadcast.emit("newUser", { uname });
    console.log(getUsers());
  });
  socket.on("disconnect", () => {
    let disconnectedUser = getUser(socket.id).username;
    removeUser(socket.id);
    io.emit("userDisconnect", { disconnectedUser });
  });
  socket.on("message", ({ uname, message }) => {
    let username = uname;
    io.emit("message", { username, message });
  });
});
