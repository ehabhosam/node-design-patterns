import { Chance } from "chance";
import { Readable } from "stream";

const chance = new Chance();

export default class RandomStream extends Readable {
  constructor(options) {
    super(options);
    this.streamedBytes = 0;
  }

  _read(size) {
    console.log("stream size is:", size);
    const chunk = "RANDOM: " + chance.string({ length: size });
    this.push(chunk, "utf-8");
    this.streamedBytes += chunk.length;
    if (chance.bool({ likelihood: 5 })) {
      this.push(null);
    }
  }
}
