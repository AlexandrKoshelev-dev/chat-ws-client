const status = document.getElementById("status");
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");
const count = document.getElementById("online_count");

const ws = new WebSocket("ws://localhost:3000");

function setStatus(value) {
  status.innerHTML = value;
}

function setOnlineCount(value) {
  count.innerHTML = value;
}

function printMessage(value) {
  const li = document.createElement("li");

  li.innerHTML = value;
  messages.appendChild(li);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  ws.send(input.value);
  input.value = "";
});

ws.onopen = () => setStatus("ONLINE");

ws.onclose = () => setStatus("DISCONNECTED");

ws.onmessage = (res) => {
  console.log(res.data);
  if (res.data[0] === " ") {
    switch (res.data.split("_")[0]) {
      case " ONLINE":
        setOnlineCount(res.data.split("_")[1]);
        break;

      default:
        break;
    }
  } else printMessage(res.data);
};
