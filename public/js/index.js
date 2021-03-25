const socket = io();
const chatList = document.querySelector(".chat-list");
let uname = "";

function checkUnameLStorage() {
  let savedUsername = localStorage.getItem("pwa-uname");
  if (savedUsername) {
    uname = savedUsername;
    return;
  }
  askUserName();
  return;
}

function askUserName() {
  uname = prompt("Enter your Name");
  while (uname == null || uname == "") {
    uname = prompt("Enter your Username");
  }
  localStorage.setItem("pwa-uname", uname);
}

checkUnameLStorage();

socket.emit("userConnected", { uname });

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let message = form.message.value;
  console.log(message);
  form.message.value = "";
  socket.emit("message", { uname, message });
});

socket.on("newUser", ({ uname }) => {
  let li = document.createElement("li");
  li.classList.add("chat-item", "other");
  li.innerHTML = `
    <h2 class = "chat-uname">
      Room Master
    </h2>
    <p class="chat-message">
      Reminder: ${uname} has joined the Chat!  
    </p>
      `;
  chatList.appendChild(li);
});

socket.on("userDisconnect", ({ disconnectedUser }) => {
  let li = document.createElement("li");
  li.classList.add("chat-item", "other");
  li.innerHTML = `
    <h2 class = "chat-uname">
      Room Master
    </h2>
    <p class="chat-message">
      Reminder: ${disconnectedUser} has Left the Chat!  
    </p>
      `;
  chatList.appendChild(li);
});

socket.on("message", ({ username, message }) => {
  let li = document.createElement("li");
  li.classList.add("chat-item");
  if (username == uname) {
    li.classList.add("user");
  } else {
    li.classList.add("other");
  }
  li.innerHTML = `
    <h2 class = "chat-uname">
      ${username}
    </h2>
    <p class="chat-message">
      ${message}  
    </p>
      `;

  chatList.appendChild(li);
  chatList.scrollTop = chatList.scrollHeight;
});
