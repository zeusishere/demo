// const net = require("net");
// const client = net.createConnection({ port: 9000 }, () => {
//   console.log("CLIENT: I connected to the server.");
// });
// client.on("data", (data) => {
//   console.log(data.toString());
//   //   client.end();
// });
const db = require("./config/mongoose");
const helperFunctions = require("./emitter-Helper-functions/helperFunctions");
const http = require("http");
const { decryptData } = require("./emitter-Helper-functions/helperFunctions");
const server = http.createServer();
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  // either with send()
  socket.send("Hello! ");
  console.log("A socket connected");

  // or with emit() and custom event names
  socket.emit("greetings", "Hey!", { ms: "jane" }, Buffer.from([4, 3, 3, 1]));

  // handle the event sent with socket.send()
  socket.on("message", (data) => {
    console.log(data);
  });
  // handle the event sent with socket.emit()
  socket.on("salutations", (elem1, elem2, elem3) => {
    console.log(elem1, elem2, elem3);
  });
  // new client connection
  socket.on("connected", (data) => {
    console.log(data);
  });
  socket.on("send-encrypted-data", ({ data }) => {
    // console.log("recieved data is ", data);
    dataHandler(data);
  });
});

server.listen(3000);

function dataHandler(data) {
  let initVector = "5183666c72eec9e4";
  let secretKey = "bf3c199c2470cb477d907b1e0917c17b";
  let arrayOfEncryptedObjects = data.split("|");
  let arrayOfDecryptedObjects = arrayOfEncryptedObjects.map((object) => {
    return decryptData(object, initVector, secretKey);
  });
  let arrayOfValidatedObjects = arrayOfDecryptedObjects.filter(
    ({ secret_key, ...data }, index) => {
      //   if (index % 2 == 0) {
      //     secret_key = secret_key + "2";
      //     // console.log("secret key", secretKey);
      //   }

      let hashOfData = helperFunctions.createHash(data);
      return hashOfData === secret_key;
    }
  );
  // .filter();
  console.log(arrayOfValidatedObjects);
}
