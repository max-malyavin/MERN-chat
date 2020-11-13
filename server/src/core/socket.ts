import socket from "socket.io";
import http from "http";

export default (http: http.Server) => {
  const io = socket(http, { transports: ["websocket", "polling"] });
  io.on("connection", function (socket: any) {
    console.log("start");
    socket.on("DIALOGS:JOIN", (dialogId: string) => {
      socket.dialogId = dialogId;
      socket.join(dialogId);
    });
    socket.on("DIALOGS:TYPING", (obj: any) => {
      socket.broadcast.emit("DIALOGS:TYPING", obj);
    });
  });

  return io;
};
