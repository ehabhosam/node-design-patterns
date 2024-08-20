import { createServer } from "http";
import { cpus } from "os";
import cluster from "cluster";

/**
    if (cluster.isMaster) { // isMaster is deprecated
        fork()
    } else {
        do work
    }
 */

if (cluster.isPrimary) {
  // if primary? fork worker in each availabe core
  const availableCpus = cpus();
  console.log(`Clustering to ${availableCpus.length} processes`);
  availableCpus.forEach(() => cluster.fork());

  // if a child process crash, spawn another one.
  cluster.on("exit", (worker, code) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(
        `Worker ${worker.process.pid} crashed. ` + "Starting a new worker"
      );
      cluster.fork();
    }
  });

  // add ability to restart workers
  // workers will restart one by one, server will not go down
  process.on("SIGUSR2", async () => {
    const workers = Object.values(cluster.workers);
    for (const worker of workers) {
      console.log(`Stopping worker: ${worker.process.pid}`);
      worker.disconnect(); // (2)
      await once(worker, "exit");
      if (!worker.exitedAfterDisconnect) continue;
      const newWorker = cluster.fork(); // (4)
      await once(newWorker, "listening"); // (5)
    }
  });
} else {
  // else do the work needed from each worker (will run inside forked process)
  const { pid } = process;

  const server = createServer((req, res) => {
    let i = 1e7;
    while (i > 0) {
      i--;
    }
    console.log(`Handling request from ${pid}`);
    res.end(`Hello from ${pid}\n`);
  });
  server.listen(8080, () => console.log(`Started at ${pid}`));
}
