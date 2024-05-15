// /**
//  You can download the data in CSV format and build a stream processing script that
//  analyzes the data and tries to answer the following questions:
//  • Did the number of crimes go up or down over the years? -> compare first record to last
//  • What are the most dangerous areas of London? most repeated areas
//  • What is the most common crime per area? most repeated crime
//  • What is the least common crime? least repeated crime
//  */

// // downloaded csv file to:
// // "D:\Downloads\london_crime_by_lsoa.csv"

// // lsoa_code,borough,major_category,minor_category,value,year,month

// const { createReadStream } = require("fs");
// const { pipeline, Transform } = require("stream");
// const { parse } = require("csv-parse");

// const csvParse = parse({ columns: true });
// pipeline(createReadStream("sample.csv"), csvParse, process.stdout);

// // class Aggergate extends Transform {
// //   constructor(options = {}) {
// //     options.objectMode = true;
// //     super(options);
// //     this.total = 0;
// //   }
// //   _transform(record, enc, cb) {
// //     this.total += Number.parseFloat(record.profit);
// //     cb();
// //   }
// //   _flush(cb) {
// //     this.push(this.total.toString());
// //     cb();
// //   }
// // }

// const filePath = "D:/Downloads/london_crime_by_lsoa.csv";
const { createReadStream, createWriteStream } = require("fs");
const { pipeline, Transform, Writable } = require("stream");
const { parse } = require("csv-parse");

// Define a transform stream to process the parsed CSV data
const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    // Process the data here if needed
    // For example, you can log the chunk
    console.log(typeof chunk);
    // Then pass the data along
    callback(null, chunk);
  },
});

// Create a readable stream from the CSV file
const readStream = createReadStream("sample.csv");

// Parse the CSV data with appropriate options
const csvParse = parse({ columns: true });

// Create a writable stream to process.stdout with stringified data
const writeStream = new Writable({
  write(chunk, encoding, callback) {
    console.log("im here");
    this.push(JSON.stringify(chunk));
    callback();
  },
});

// Set up the pipeline
pipeline(readStream, csvParse, writeStream, process.stdout, (err) => {
  if (err) {
    console.error("Pipeline failed.");
  } else {
    console.log("Pipeline succeeded.");
  }
});
