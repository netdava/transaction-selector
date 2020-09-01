import xmlbuilder2 from "xmlbuilder2";
import dateFns from "date-fns";
import fs from 'fs';
import path from 'path';
import currency from 'currency.js';

import { processCsv, parseCsv } from './ing-parser/index.js';

const { create } = xmlbuilder2;

const settings = {
    decimal: ',',
    separator: '',
    precision: '2',
    symbol: '',
}

export function transactionType(credit, debit) {
    if (credit !== "0" && debit === "0") {
        return 'CREDIT'
    }
    return 'DEBIT'
};

export function transactionAmt(credit, debit) {

    if (credit !== "0" && debit === "0") {
        return currency(credit, settings).format();
    }
    return `-${currency(debit, settings).format()}`;
}

export function mapTransaction(tx) {
    const { credit, debit, title, date, txNumber, details, parsedDetails } = tx;

    switch (title) {
        case 'Cumparare POS':
            return {
                TRNTYPE: transactionType(credit, debit),
                DTPOSTED: dateFns.format(new Date(date), "yyyyMMdd"),
                TRNAMT: transactionAmt(credit, debit),
                NAME: parsedDetails.Terminal,
                FITID: `x-${date}-${txNumber}`,
                MEMO: details.toString(),
                REFNUM: parsedDetails.Referinta,
            }
            break;
        case 'Taxe si comisioane':
            return {
                TRNTYPE: 'DEBIT',
                DTPOSTED: dateFns.format(new Date(date), "yyyyMMdd"),
                TRNAMT: transactionAmt(credit, debit),
                NAME: 'ING BANK',
                FITID: `x-${date}-${txNumber}`,
                MEMO: details.toString(),
                REFNUM: parsedDetails.Referinta,
            }
            break;
        case 'Comision pe operatiune ':
            return {
                TRNTYPE: 'DEBIT',
                DTPOSTED: dateFns.format(new Date(date), "yyyyMMdd"),
                TRNAMT: transactionAmt(credit, debit),
                NAME: 'ING BANK',
                FITID: `x-${date}-${txNumber}`,
            }
            break;
        case 'Plata debit direct':
            return {
                TRNTYPE: transactionType(credit, debit),
                DTPOSTED: dateFns.format(new Date(date), "yyyyMMdd"),
                TRNAMT: transactionAmt(credit, debit),
                NAME: parsedDetails.Beneficiar,
                FITID: `x-${date}-${txNumber}`,
                MEMO: details.toString(),
                REFNUM: parsedDetails.Referinta,
            }
            break;
        case 'Actualizare dobanda':
            return {
                TRNTYPE: transactionType(credit, debit),
                DTPOSTED: dateFns.format(new Date(date), "yyyyMMdd"),
                TRNAMT: transactionAmt(credit, debit),
                NAME: "ING BANK",
                FITID: `x-${date}-${txNumber}`,
                MEMO: title,
            }
            break;
        case 'Incasare':
            return {
                TRNTYPE: transactionType(credit, debit),
                DTPOSTED: dateFns.format(new Date(date), "yyyyMMdd"),
                TRNAMT: transactionAmt(credit, debit),
                FITID: `x-${date}-${txNumber}`,
                MEMO: details.toString(),
                REFNUM: parsedDetails.Referinta,
            }
            break;
        case 'Retragere numerar':
            return {
                TRNTYPE: transactionType(credit, debit),
                DTPOSTED: dateFns.format(new Date(date), "yyyyMMdd"),
                TRNAMT: transactionAmt(credit, debit),
                NAME: parsedDetails.Terminal,
                FITID: `x-${date}-${txNumber}`,
                MEMO: details.toString(),
            }
            break;
        case "Transfer Home'Bank":
            return {
                TRNTYPE: transactionType(credit, debit),
                DTPOSTED: dateFns.format(new Date(date), "yyyyMMdd"),
                TRNAMT: transactionAmt(credit, debit),
                NAME: parsedDetails.Beneficiar,
                FITID: `x-${date}-${txNumber}`,
                MEMO: details.toString(),
                REFNUM: parsedDetails.Referinta,
            }
            break;
        case 'Cumparare POS corectie':
            return {
                TRNTYPE: transactionType(credit, debit),
                DTPOSTED: dateFns.format(new Date(date), "yyyyMMdd"),
                TRNAMT: transactionAmt(credit, debit),
                NAME: parsedDetails.Terminal,
                FITID: `x-${date}-${txNumber}`,
                MEMO: details.toString(),
            }
            break;
        default:
            throw new Error(`Operatiune necunoscuta - ${JSON.stringify(tx)}`);
    }
};

export function convertCsvToOfx(transactions, options) {
    const body = {
        OFX: {
            SIGNONMSGSRSV1: {},
            BANKMSGSRSV1: {
                STMTTRNRS: {
                    STMTRS: {
                        CURDEF: "RON",
                        BANKACCTFROM: {
                            BANKID: '000000007',
                            ACCTID: '00000013',
                            ACCTTYPE: "CHECKING"
                        },
                        BANKTRANLIST: {
                            STMTTRN: [
                                transactions.map(t => mapTransaction(t)),
                            ]
                        }
                    }
                }
            }
        }
    };

    const doc = create({ encoding: "UTF-8" }, body);

    const xml = doc.end({ prettyPrint: true });
    return xml;
}

export function csvToJson(csvFileName, pathToCsv) {
    const csvData = fs.readFileSync(path.resolve(`${pathToCsv}${csvFileName}.csv`), 'utf8');
    const txns = processCsv(parseCsv(csvData));
    fs.writeFileSync(`src/data/samples/${csvFileName}.json`, JSON.stringify(txns));
}
