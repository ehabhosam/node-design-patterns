import CustomPromiseAll from "./promise-all";
import { delay } from "../../utils";

const promises = [delay(2000), delay(5000), delay(1000)];

console.log(promises);

Promise.all(promises)
  .then(async () => {
    console.log("native promise.all done");
    const _promises = [delay(2000), delay(5000), delay(1000)];
    return await CustomPromiseAll(_promises);
  })
  .then(() => {
    console.log("custom promise.all done");
  });
