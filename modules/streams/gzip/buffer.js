import { promises as fs } from "fs";
import { gzip } from "zlib";
import { promisify } from "util";

const gzipPromise = promisify(gzip);

export default async function gzipBuffer(filename) {
  const data = await fs.readFile(filename);
  const gzippedData = await gzipPromise(data);
  await fs.writeFile(`${filename}.gz`, gzippedData);
  console.log("File successfully compressed");
}
