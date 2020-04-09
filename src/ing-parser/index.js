import Papa from "papaparse";
import _ from "lodash";
import moment from "moment";

export function safeParseAmount(amount) {
  if (amount == null || amount === "") {
    return "0";
  }
  return amount;
}

export function localDateToLocalDateIsoFormat(date) {
  moment.locale("ro");
  try {
    let isoDate = moment(date, "d MMMM yyyy").format(moment.ISO_8601);
    return isoDate;
  } catch (e) {
    return "2050-01-01";
  }
}

export function buildTransaction(txNumber, rows) {
  const firstRow = rows[0];

  const debit = safeParseAmount(firstRow[5]),
    credit = safeParseAmount(firstRow[7]),
    balance = safeParseAmount(firstRow[8]);

  const details = rows.slice(1).map((cols) => cols[4]);

  let parsedDetails = {};

  _.forEach(details, str => {
    if (str.indexOf(":") > 0) {
        let s = str.split(":", 2);
        parsedDetails[s[0]] = s[1];
      } else {
        parsedDetails[str] = str;
      }
  })


  const txn = {
    txNumber: txNumber,
    date: localDateToLocalDateIsoFormat(firstRow[1]),
    title: firstRow[4],
    debit: debit,
    credit: credit,
    balance: balance,
    originalData: rows,
    details: details,
    parsedDetails: parsedDetails,
  };

  return txn;
}

export function parseTransactions(transactionLines) {
  const groupedTxns = _.groupBy(transactionLines, (row) => row[0]);

  let txns = [];

  for (let [key, value] of Object.entries(groupedTxns)) {
    const txn = buildTransaction(key, value);
    txns.push(txn);
  }
  console.log(txns);
  return txns;
}

/**
Process the list of transactions and add the transaction number/count as a prefix to all rows
that belong to the same transaction.
*/
export function prefixWithTransactionCount(transactionRows) {
  let count = 0;
  const processedLines = transactionRows.map((row) => {
    if (!(row[0] === "")) {
      count++;
    }
    let rowData = [count];
    rowData = rowData.concat(row);
    // console.log(rowData);
    return rowData;
  });

  return processedLines;
}

/**
Removes CSV data that is not part of transactions: headers and footers from ING:
- the repeated csv table header
- the information about ING representative
*/
export function cleanTransactionsLines(lines) {
  const transactionRows = lines
    .filter((row) => !(row[0] === "Data"))
    .filter((it) => it[1] === "")
    .filter((it) => it[2] === "");

  //   console.log(transactionRows);

  return transactionRows;
}

export function parseCsv(csvData) {
  const csv = Papa.parse(csvData);
  //   console.log(csv);

  return csv;
}
