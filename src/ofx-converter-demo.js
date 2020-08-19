const convert = require("xml-js");
const fs = require("fs");
const transactions = require("./data/2017.json");

const { mapTransaction } = require("./ofx-converter");


const header = {
    OFXHEADER: '100',
    DATA: 'OFXSGML',
    VERSION: '103',
    SECURITY: 'NONE',
    ENCODING: 'USASCII',
    CHARSET: '1252',
    COMPRESSION: 'NONE',
    OLDFILEUID: 'NONE',
    NEWFILEUID: 'NONE'
};

const body = {
    SIGNONMSGSRSV1: {},
    BANKMSGSRSV1: {
        STMTTRNRS: {
            STMTRS: {
                CURDEF: "RON",
                BANKTRANLIST: {
                    STMTTRN: [
                        transactions.map(t => mapTransaction(t)),
                    ]
                }
            }
        }
    }
};

const ofx = {
    START: header,
    OFX: body
}

var options = { compact: true, ignoreComment: true, spaces: 4 };
const ofx_string = convert.js2xml(ofx, options);
console.log(ofx_string);

fs.writeFileSync("build/newdata.ofx", ofx_string);