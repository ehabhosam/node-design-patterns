import level from "level";
import sublevel from "subleveldown";
import { createServer } from "http";
import { totalSales } from "./totalSales.js";
// import { totalSales } from './totalSalesBatch.js'
// import { totalSales } from './totalSalesCache.js'

createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  const product = url.searchParams.get("product");
  console.log(`Processing query: ${url.search}`);

  const sum = await totalSales(product);

  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  res.end(
    JSON.stringify({
      product,
      sum,
    })
  );
}).listen(8000, () => console.log("Server started"));

function findAllTransactions() {
  const db = level("example-db");
  const salesDb = sublevel(db, "sales", { valueEncoding: "json" });
  return new Promise((resolve, reject) => {
    const transactions = [];
    db.createValueStream()
      .on("data", (data) => transactions.push(data))
      .on("end", () => resolve(transactions))
      .on("error", reject);
  });
}

findAllTransactions().then((transactions) => {
  console.log(`Found ${transactions.length} transactions`);
});
