import CustomPromiseAll from "./promise-all";
import { delay } from "../../utils";
import mapAsync from "./map-async";

// const promises = [delay(2000), delay(5000), delay(1000)];

// Promise.all(promises)
//   .then(async () => {
//     console.log("native promise.all done");
//     const _promises = [delay(2000), delay(5000), delay(1000)];
//     return await CustomPromiseAll(_promises);
//   })
//   .then(() => {
//     console.log("custom promise.all done");
//   });

const items = [
  "ehab",
  "hosam",
  "awad",
  "omar",
  "mohamed",
  "magdy",
  "afsha",
  "emam",
  "ashour",
];
const delays = [2000, 4000, 3000, 5000, 1000, 1000, 2000, 2000, 3000];

async function printItemAfterDelay(item) {
  await delay(delays[items.indexOf(item)]);
  console.log(item);
  return "resolved " + item;
}

console.log("before map async starts");

const updatedItems = await mapAsync(items, printItemAfterDelay, 3);

console.log("after map async done");
console.log(updatedItems);
