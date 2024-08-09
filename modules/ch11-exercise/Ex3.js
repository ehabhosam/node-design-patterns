// 11.4 Compute farm: Create an HTTP server with a POST endpoint that
// receives, as input, the code of a function (as a string) and an array of
// arguments, executes the function with the given arguments in a worker
// thread or in a separate process, and returns the result back to the client.
// Hint: You can use eval(), vm.runInContext(), or neither of the two. Note:
// Whatever code you produce for this exercise, please be aware that allowing
// users to run arbitrary code in a production setting can pose serious security
// risks, and you should never do it unless you know exactly what the
// implications are.

import http from "http";
import workerpool from "workerpool";
import path from "path";
import { fileURLToPath } from "url";

// Worker pool setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pool = workerpool.pool(path.join(__dirname, "workerScript.js"), {
  maxWorkers: 10,
});

class WorkersAPI {
  constructor() {
    this.pool = pool;
  }

  async runScript(script, args, input) {
    try {
      return await this.pool.exec("execute", [script, args, input]);
    } catch (error) {
      return { error: error.message };
    }
  }
}

const api = new WorkersAPI();

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/execute") {
    let body = "";

    // Collect the data from the request
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // When the request has been fully received
    req.on("end", async () => {
      try {
        // Parse the JSON body
        const { script, args, input } = JSON.parse(body);

        // Run the script using WorkersAPI
        const result = await api.runScript(script, args, input);

        // Send the result back to the client
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
      } catch (error) {
        // Handle any errors
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: error.message }));
      }
    });
  } else {
    // Handle 404 Not Found for other endpoints
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
