import io from "socket.io-client";

const socket = io(``, {
  transports: ["websocket", "polling"],
  upgrade: false,
});

export default socket;
