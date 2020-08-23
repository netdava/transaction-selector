const { create } = require("xmlbuilder2");
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
    const { credit, debit, date, txNumber, title, details, parsedDetails } = tx;
    return {
        TRNTYPE: transactionType(credit, debit),
        DTPOSTED: dateFns.format(new Date(date), "yyyyMMdd"),
        TRNAMT: transactionAmt(credit, debit),
        NAME: parsedDetails.Terminal,
        FITID: `x-${date}-${txNumber}`,
        MEMO: details.toString(),
        REFNUM: parsedDetails.Referinta,
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

    const doc = create({ encoding: "UTF-8" }, body);

    const xml = doc.end({ prettyPrint: true });
    return xml;
}

exports.mapTransaction = mapTransaction;
exports.convertCsvToOfx = convertCsvToOfx;