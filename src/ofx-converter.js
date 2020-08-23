const xmlConverter = require("xmlbuilder2");
const dateFns = require("date-fns");

function transactionType(credit, debit) {
    if (credit !== "0" && debit === "0") {
        return 'CREDIT'
    }
    return 'DEBIT'
};

function transactionAmt(credit, debit) {
    if (credit !== "0" && debit === "0") {
        return credit;
    }
    return -Math.abs(debit);
}

function mapTransaction(tx) {
    const { credit, debit, date, txNumber, title } = tx;
    return {
        TRNTYPE: transactionType(credit, debit),
        DTPOSTED: dateFns.format(new Date(date), "yyyyMMdd"),
        TRNAMT: transactionAmt(credit, debit),
        FITID: txNumber,
        MEMO: title
    }
};

function convertCsvToOfx(transactions, options) {
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
    
    const frag = xmlConverter.fragment();
    frag.ele(body);
    const xml = frag.end({ prettyPrint: true });
    
    return xml;
}

exports.mapTransaction = mapTransaction;
exports.convertCsvToOfx = convertCsvToOfx;