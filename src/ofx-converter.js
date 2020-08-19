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
        DTPOSTED: date.replace(/-/g, ''),
        TRNAMT: transactionAmt(credit, debit),
        FITID: txNumber,
        MEMO: title.toUpperCase()
    }
};

exports.mapTransaction = mapTransaction;