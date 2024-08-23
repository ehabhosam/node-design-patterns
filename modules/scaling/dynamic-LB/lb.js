import { createServer } from "http";
import httpProxy from "http-proxy";
import Consul from "consul";

const config = [
  {
    path: "/api",
    service: "my-api",
    index: 0,
  },
  {
    path: "/",
    service: "my-webapp",
    index: 0,
  },
];

const consulClient = new Consul();
const proxy = httpProxy.createProxyServer();

// we can increase the availability of our load balancer by running multiple instances of it
// using cluster module for example. But for simplicity, we'll just run one instance here
const server = createServer(async (req, res) => {
  const route = config.find((route) => req.url.startsWith(route.path));

  if (!route) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  let services;
  try {
    services = await consulClient.agent.service.list();
  } catch (error) {
    res.writeHead(502);
    return res.end("Bad Gateway ya king");
  }
  console.log("services", services);

  const servers = Object.values(services);
  const instances = servers.filter((service) =>
    service.Tags.includes(route.service)
  );

  if (instances.length === 0) {
    res.writeHead(502);
    return res.end("Bad Gateway ya king");
  }

  route.index = (route.index + 1) % instances.length; // round robin
  const instance = instances[route.index];
  const target = `http://${instance.Address}:${instance.Port}`;

  proxy.web(req, res, { target });
});

server.listen(8080, () => console.log("Started at 8080"));
