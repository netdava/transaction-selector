const ofx = require('ofx');
const fs = require("fs");
const transactions = require("./data/2017.json");

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
    SIGNONMSGSRSV1: {
      SONRQ: {
        DTCLIENT: 'value',
        USERID: 'user id',
        USERPASS: 'password',
        LANGUAGE: 'ENG',
        FI: {
          ORG: 'org',
          FID: 'fid'
        },
        APPID: 'QWIN',
        APPVER: '2100',
        CLIENTUID: 'needed by some places'
      }
    }
};

function transactionType(credit, debit) {
    if (credit > 0 && debit == 0) {
        return 'Credit'
    }
    if (credit == 0 && debit > 0) {
        return 'Debit'
    }
    return 'N/A'
    
}

const transaction = (obj) => {
    return {
        STMTTRN: {
            TRNTYPE: transactionType(obj.credit, obj.debit),
            DTPOSTED: '20091016080000',
            DTUSER: '20090916080000',
            TRNAMT: '60.39',
            FITID: '200910162',
            CHECKNUM: '0880136',
            MEMO: obj.title
        }
    }
};

const mapTransactions = transactions.map( t =>
    {
        return transaction(t);
    })

const ofx_string = ofx.serialize(header, mapTransactions);
console.log(ofx_string);

fs.writeFileSync("build/newdata.ofx", ofx_string);