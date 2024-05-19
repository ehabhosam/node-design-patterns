import { request } from "http";
import { URL } from "url";

export class RequestBuilder {
  constructor() {
    this.options = {};
    this.body = null;
    this.queryParams = new URLSearchParams();
  }

  setUrl(url) {
    this.url = new URL(url);
    return this;
  }

  setHttpMethod(method) {
    this.options.method = method;
    return this;
  }

  setHeaders(headers) {
    this.options.headers = headers;
    return this;
  }

  setQueryParams(params) {
    for (const [key, value] of Object.entries(params)) {
      this.queryParams.append(key, value);
    }
    return this;
  }

  setBody(body) {
    this.body = body;
    return this;
  }

  invoke() {
    return new Promise((resolve, reject) => {
      this.url.search = this.queryParams.toString();
      const options = {
        ...this.options,
        hostname: this.url.hostname,
        path: `${this.url.pathname}${this.url.search}`,
        port: this.url.port,
        protocol: this.url.protocol,
      };

      const req = request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data,
          });
        });
      });

      req.on("error", (e) => {
        reject(e);
      });

      if (this.body && ["POST", "PUT", "PATCH"].includes(this.options.method)) {
        req.write(this.body);
      }

      req.end();
    });
  }
}
