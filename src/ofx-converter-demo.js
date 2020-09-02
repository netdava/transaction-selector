import fs from 'fs';
import { convertCsvToOfx, csvToJson }from './ofx-converter.js';
import path from 'path';

function jsonToOfx(jsonData) {
    const transactions = JSON.parse(jsonData);
    const xml = convertCsvToOfx(transactions,{});
    return xml;
}

const iunieIulieCsv = fs.readFileSync(path.resolve('src/data/stan_andrei_csv/iunie-iulie.csv'), 'utf8');
fs.writeFileSync(`src/data/samples/iunie-iulie.json`, csvToJson(iunieIulieCsv));
const iunieIulieJson = fs.readFileSync( path.resolve('src/data/samples/iunie-iulie.json'), 'utf8');
fs.writeFileSync('build/iunie-iulie.xml.ofx', jsonToOfx(iunieIulieJson));


