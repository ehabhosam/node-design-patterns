import level from "level";
import sub from "subleveldown";
import { nanoid } from "nanoid";

const db = level("example");
const salesDb = sub(db, "sales", { valueEncoding: "json" });

console.log("Populating DB...");

const products = ["book", "game", "app", "song", "movie"];

async function populate() {
  for (let i = 0; i < 100000; i++) {
    await salesDb.put(nanoid(), {
      amount: Math.ceil(Math.random() * 100),
      product: products[Math.floor(Math.random() * 5)],
    });
  }

  console.log("DB populated");
}

populate();
