const xmlbuilder2 = require("xmlbuilder2");
const fs = require("fs");
const transactions = require("./data/2017.json");

const { mapTransaction } = require("./ofx-converter");


const header = {
    START: {
        OFXHEADER: '100',
        DATA: 'OFXSGML',
        VERSION: '103',
        SECURITY: 'NONE',
        ENCODING: 'USASCII',
        CHARSET: '1252',
        COMPRESSION: 'NONE',
        OLDFILEUID: 'NONE',
        NEWFILEUID: 'NONE'
    }
};

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

const frag = xmlbuilder2.fragment();
frag.ele(header);
frag.ele(body);

const xml = frag.end({ prettyPrint: true });
console.log(xml);

fs.writeFileSync("build/newdata.ofx", xml);