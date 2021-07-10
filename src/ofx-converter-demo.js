import fs from 'fs';
import { convertCsvToOfx, csvToJson }from './ofx-converter.js';
import path from 'path';

function jsonToOfx(jsonData) {
    const transactions = JSON.parse(jsonData);
    const xml = convertCsvToOfx(transactions,{});
    return xml;
}

const maiCsv = fs.readFileSync(path.resolve('src/data/stan_andrei_csv/mai-2020.csv'), 'utf8');
fs.writeFileSync(`src/data/samples/mai.json`, csvToJson(maiCsv));
const maiJson = fs.readFileSync( path.resolve('src/data/samples/mai.json'), 'utf8');
fs.writeFileSync('build/mai.xml.ofx', jsonToOfx(maiJson));

const iunieCsv = fs.readFileSync(path.resolve('src/data/stan_andrei_csv/iunie-2020.csv'), 'utf8');
fs.writeFileSync(`src/data/samples/iunie.json`, csvToJson(iunieCsv));
const iunieJson = fs.readFileSync( path.resolve('src/data/samples/iunie.json'), 'utf8');
fs.writeFileSync('build/iunie.xml.ofx', jsonToOfx(iunieJson));

const iulieCsv = fs.readFileSync(path.resolve('src/data/stan_andrei_csv/iulie-2020.csv'), 'utf8');
fs.writeFileSync(`src/data/samples/iulie.json`, csvToJson(iulieCsv));
const iulieJson = fs.readFileSync( path.resolve('src/data/samples/iulie.json'), 'utf8');
fs.writeFileSync('build/iulie.xml.ofx', jsonToOfx(iulieJson));



