import { request } from "http";
import getStream from "get-stream";

// in a better scaling scenario, we would obtain the servers from a service registry (e.g. Consul)
const servers = [
  { host: "localhost", port: 8081 },
  { host: "localhost", port: 8082 },
];

let i = 0;

// this function is a load balanced interface to make requests to the server
// it uses a round-robin algorithm to distribute the requests

export function balancedRequest(options) {
  return new Promise((resolve) => {
    i = (i + 1) % servers.length;
    options.hostname = servers[i].host;
    options.port = servers[i].port;
    request(options, (response) => {
      resolve(getStream(response));
    }).end();
  });
}
