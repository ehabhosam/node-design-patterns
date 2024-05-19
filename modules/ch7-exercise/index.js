/*
    Exercise 1
*/

// import { createColorConsole } from "./console-colors/create-color-console";

// const redConsole = createColorConsole("red");
// const blueConsole = createColorConsole("blue");
// const greenConsole = createColorConsole("green");

// redConsole.log("this is red");
// blueConsole.log("this is blue");
// greenConsole.log("this is green");

/*
    Exercise 2
*/

// import { RequestBuilder } from "./request-builder";

// const request = new RequestBuilder();
// request
//   .setUrl("http://example.com")
//   .setHttpMethod("GET")
//   .setHeaders({ "Content-Type": "application/json" })
//   .setQueryParams({ key1: "value1", key2: "value2" })
//   .invoke()
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

/*
    Exercise 3
*/

import { TamperFreeQueue } from "./tamper-free-queue";
import { createServer } from "http";

function isValidTask(task) {
  return (
    typeof task === "object" &&
    task !== null &&
    typeof task.name === "string" &&
    typeof task.duration === "number" &&
    task.duration >= 0
  );
}

const queue = new TamperFreeQueue(({ enqueue }) => {
  const server = createServer((req, res) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const taskData = JSON.parse(body);

        if (isValidTask(taskData)) {
          res.writeHead(200, { "Content-Type": "text/plain" });
          enqueue(taskData);
          res.end("Task Pushed!\n");
        } else {
          res.statusCode = 400;
          res.end("No valid task provided.");
        }
      } catch (error) {
        res.statusCode = 400;
        res.end("Invalid JSON format");
      }
    });
  });

  server.listen(8081, () => {
    console.log("Server Up, listening for tasks ... ");
  });
});

async function handleTask(task) {
  console.log(`Handling task "${task.name}"...`);
  await new Promise((resolve) => setTimeout(resolve, task.duration));
  console.log(`Task "${task.name}" completed!`);
}

async function dequeueLoop() {
  while (true) {
    try {
      const item = await queue.dequeue();
      console.log("Dequeued item:", item);
      handleTask(item);
    } catch (error) {
      console.error("Error while dequeuing:", error);
    }
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Delay for 3 seconds
  }
}

dequeueLoop().catch((error) => {
  console.error("Error in dequeue loop:", error);
});
