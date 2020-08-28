import fs from 'fs';
import { convertCsvToOfx } from './ofx-converter.js';
import path from 'path';

const jsonData = fs.readFileSync( path.resolve('src/data/2017.json'), 'utf8');
const transactions = JSON.parse(jsonData);
const xml = convertCsvToOfx(transactions,{});
console.log(xml);
fs.writeFileSync("build/newdata.xml.ofx", xml);




