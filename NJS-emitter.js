// const net = require("net");
const helperFunctions = require("./emitter-Helper-functions/helperFunctions");
// const server = net.createServer();
// server.on("connection", (socket) => {
//   console.log(
//     "new client connection is made",
//     socket.remoteAddress + ":" + socket.remotePort
//   );
//   socket.on("data", (data) => {
//     console.log(data.toString());
//   });
//   socket.once("close", () => {
//     console.log("client connection closed.");
//   });
//   socket.on("error", (err) => {
//     console.log("client connection got errored out.");
//   });
//   socket.write("SERVER: Hello! Connection successfully made.<br>");
//   socket.write("shubhsm123456 !@#$%^&*()_+");
//   let res = sendDataToClient();
//   socket.write(res);
// });
// server.on("error", (e) => {
//   if (e.code === "EADDRINUSE") {
//     console.log("Address in use, retrying...");
//     setTimeout(() => {
//       server.close();
//       server.listen(PORT, HOST);
//     }, 1000);
//   } else {
//     console.log("Server failed.");
//   }
// });
// server.listen(9000, () => {
//   console.log("opened server on port: ", server.address());
// });

// socket.io code below
const { io } = require("socket.io-client");
// const socket = io();
const socket = io("http://localhost:3000");
// socket.on("connect", function (socket) {
//   console.log("Connected!");
// });
socket.emit("connected", { message: "a new client connected" });
socket.emit("send-encrypted-data", { data: sendDataToClient() });
// socket code ends
function sendDataToClient() {
  let arrayOfOriginalData = helperFunctions.createArrayOfObjects();
  let arrayOFHashedAndEncryptedObjects =
    helperFunctions.generateArrayOfHashedAndEncryptedObjectsFromInputArray(
      arrayOfOriginalData
    );
  return arrayOFHashedAndEncryptedObjects.join("|");

  // console.log(res);
  //   let obj = { name: "shubham", origin: "agra", destination: "lucknow" };
  //   let hashOfObj = helperFunctions.createHash(obj);
  //   console.log("hash is ", hashOfObj);
  //   let updatedObj = { ...obj, secret_key: hashOfObj };
  //   console.log("updatedObj is", updatedObj);
  //   const initVector = require("crypto")
  //     .randomBytes(16)
  //     .toString("hex")
  //     .slice(0, 16);
  //   const securityKey = require("crypto")
  //     .randomBytes(32)
  //     .toString("hex")
  //     .slice(0, 32);
  //   let encObj = helperFunctions.encryptData(updatedObj, initVector, securityKey);
  //   console.log("encrypted Obj is", encObj);
  //   let decObj = helperFunctions.decryptData(encObj, initVector, securityKey);
  //   console.log("decrypted Obj is", decObj);
}
