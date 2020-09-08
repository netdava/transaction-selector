import xmlbuilder2 from "xmlbuilder2";
import dateFns from "date-fns";
import fs from 'fs';
import path from 'path';
import currency from 'currency.js';
import md5 from 'blueimp-md5';

import { processCsv, parseCsv } from './ing-parser/index.js';

const { create } = xmlbuilder2;

function uniqueTnxId(tx) {
    const { title, date, credit, debit, balance, details} = tx;
    const  detailsStr = details.sort().join();
    const txData = ''.concat(title, date, credit, debit, balance, detailsStr);
    const hashedStr = md5(txData);
    return hashedStr;
}

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

export function isCredit(credit, debit) {
    if (credit === "0" && debit === "0") {
        throw new Error(`Transaction invalid with credit = ${credit} and debit = ${debit}`);
    }
    if (credit !== "0" && debit === "0") {
        return true;
    }
    return false;
};

function parseCurrency(curr) {
    return currency(curr, settings).format();
}

function parseCredit(amount) {
    return parseCurrency(amount);
}

function parseDebit(amount) {
    return `-${parseCurrency(amount)}`;
}

export function transactionAmt(credit, debit) {
    if (isCredit(credit, debit)) {
        return parseCredit(credit);
    } else {
        return parseDebit(debit);
    }
}

export function mapTransaction(tx) {
    const { credit, debit, title, date, balance, details, parsedDetails } = tx;

    switch (title) {
        case 'Cumparare POS':
            return {
                TRNTYPE: transactionType(credit, debit),
                DTPOSTED: dateFns.format(new Date(date), "yyyyMMdd"),
                TRNAMT: transactionAmt(credit, debit),
                NAME: parsedDetails.Terminal,
                FITID: uniqueTnxId(tx),
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
                FITID: uniqueTnxId(tx),
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
                FITID: uniqueTnxId(tx),
            }
            break;
        case 'Plata debit direct':
            return {
                TRNTYPE: transactionType(credit, debit),
                DTPOSTED: dateFns.format(new Date(date), "yyyyMMdd"),
                TRNAMT: transactionAmt(credit, debit),
                NAME: parsedDetails.Beneficiar,
                FITID: uniqueTnxId(tx),
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
                FITID: uniqueTnxId(tx),
                MEMO: title,
            }
            break;
        case 'Incasare':
            return {
                TRNTYPE: transactionType(credit, debit),
                DTPOSTED: dateFns.format(new Date(date), "yyyyMMdd"),
                TRNAMT: transactionAmt(credit, debit),
                NAME: parsedDetails.Ordonator,
                FITID: uniqueTnxId(tx),
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
                FITID: uniqueTnxId(tx),
                MEMO: details.toString(),
            }
            break;
        case "Transfer Home'Bank":
            return {
                TRNTYPE: transactionType(credit, debit),
                DTPOSTED: dateFns.format(new Date(date), "yyyyMMdd"),
                TRNAMT: transactionAmt(credit, debit),
                NAME: parsedDetails.Beneficiar,
                FITID: uniqueTnxId(tx),
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
                FITID: uniqueTnxId(tx),
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

export function csvToJson(file) {
    const txns = processCsv(parseCsv(file));
    return JSON.stringify(txns);
}
