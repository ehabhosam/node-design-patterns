import { createServer } from "http";
import Chance from "chance";

const chance = new Chance();

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  while (chance.bool({ likelihood: 95 })) {
    res.write("this is streamed data line: " + `${chance.string()}\n`);
  }
  res.end("end of stream.\n");
  res.on("finish", () => {
    console.log("done streaming data");
  });
});

server.listen(8081, () => {
  console.log("server listening on port", 8081);
});
