import { createServer } from "http";
import consul from "consul";
import portfinder from "portfinder";
import { nanoid } from "nanoid";

const serviceName = process.argv[2] || "dynamic-LB";
const pid = process.pid;

async function main() {
  const consulClient = new consul();

  const port = await portfinder.getPortPromise({
    startPort: 8000, // start port for portfinder
  });
  const address = process.env.ADDRESS || "localhost";
  const serviceId = nanoid();

  function registerService() {
    consulClient.agent.service.register(
      {
        id: serviceId,
        name: serviceName,
        address,
        port,
        tags: [serviceName],
      },
      () => {
        console.log(
          `Registered ${serviceName} at ${address}:${port} successfully`
        );
      }
    );
  }

  function deregisterService(err) {
    if (err) console.error(err);

    console.log(
      `Deregistering ${serviceId} ${serviceName} at ${address}:${port}`
    );
    consulClient.agent.service.deregister(serviceId, () => {
      process.exit(err ? 1 : 0); // exit with error code 1 if there's an error
    });
  }

  process.on("exit", deregisterService);
  process.on("uncaughtException", deregisterService);
  process.on("SIGINT", deregisterService);

  const server = createServer((req, res) => {
    let i = 1e7;
    while (i > 0) {
      i--;
    }
    console.log(`Handling request from ${pid}`);
    res.end(`${serviceType} response from ${pid}\n`);
  });
}

main().catch(console.error);
