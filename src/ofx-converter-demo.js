import fs from 'fs';
import { convertCsvToOfx, csvToJson } from './ofx-converter.js';
import path from 'path';

function jsonToOfx(jsonData, output) {
    const transactions = JSON.parse(jsonData);
    const xml = convertCsvToOfx(transactions,{});
    fs.writeFileSync(output, xml);
}

csvToJson('iunie-iulie', 'src/data/stan_andrei_csv/');
// csvToJson('ing-iunie-2020', 'src/data/stan_andrei_csv/');
// csvToJson('ing-iulie-2020', 'src/data/stan_andrei_csv/');

const iunieIulie2020 = fs.readFileSync( path.resolve('src/data/samples/iunie-iulie.json'), 'utf8');
// const ingIunie2020 = fs.readFileSync( path.resolve('src/data/samples/ing-iunie-2020.json'), 'utf8');
// const ingIulie2020 = fs.readFileSync( path.resolve('src/data/samples/ing-iulie-2020.json'), 'utf8');

jsonToOfx(iunieIulie2020, 'build/iunie-iulie.xml.ofx');
// jsonToOfx(ingIunie2020);
// jsonToOfx(ingIulie2020)


