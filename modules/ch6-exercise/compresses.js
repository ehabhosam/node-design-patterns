// run this script with:
//  node  ./modules/ch6-exercise/compresses.js result.txt
// Note: createBrotliCompress does not work till now at but runtime

const { createGzip, createBrotliCompress, createDeflate } = require("zlib");
const { pipeline } = require("stream");
const { createReadStream, createWriteStream, statSync } = require("fs");

const filename = process.argv[2];
const startTime = Date.now();

const analytics = {
  gzip: {},
  brotli: {},
  deflate: {},
};

const sourceReadStream = createReadStream(filename);
let done = 0;

pipeline(
  sourceReadStream,
  createGzip(),
  createWriteStream("result.gz"),
  (err) => {
    if (err) console.error(err);
    analytics.gzip.time = Date.now() - startTime;
    analytics.gzip.size = statSync("result.gz").size;
    done++;
    if (done === 3) {
      console.table(analytics);
    }
  }
);

pipeline(
  sourceReadStream,
  createBrotliCompress(),
  createWriteStream("result.br"),
  (err) => {
    if (err) console.error(err);
    analytics.brotli.time = Date.now() - startTime;
    analytics.brotli.size = statSync("result.br").size;
    done++;
    if (done === 3) {
      console.table(analytics);
    }
  }
);

pipeline(
  sourceReadStream,
  createDeflate(),
  createWriteStream("result.zz"),
  (err) => {
    if (err) console.error(err);
    analytics.deflate.time = Date.now() - startTime;
    analytics.deflate.size = statSync("result.zz").size;
    done++;
    if (done === 3) {
      console.table(analytics);
    }
  }
);

// createReadStream(filename)
//   .pipe(createGzip())
//   .pipe(createWriteStream("result.gz"));

// createReadStream(filename)
//   .pipe(createBrotliCompress())
//   .pipe(createWriteStream("result.br"));

// createReadStream(filename)
//   .pipe(createDeflate())
//   .pipe(createWriteStream("result.zz"));
