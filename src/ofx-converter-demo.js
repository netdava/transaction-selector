const fs = require("fs");
const transactions = require("./data/2017.json");

const { convertCsvToOfx } = require("./ofx-converter");
// const { parseCsv, processCsv } = require('./ing-parser');

const xml = convertCsvToOfx(transactions,{});
console.log(xml);
fs.writeFileSync("build/newdata.xml.ofx", xml);

// const csvFile = fs.readFileSync("src/data/extras-0720.csv", {encoding: "UTF-8"});

// const csvData = parseCsv(csvFile);
// const transactions2 = processCsv(csvData);
// console.log(transactions2);



