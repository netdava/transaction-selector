import Papa from "papaparse";
import _ from "lodash";
import formatISO from 'date-fns/formatISO';
import parse from 'date-fns/parse';
import ro from 'date-fns/locale/ro';

/**
 * Process CSV file with ING transactions and return a javacript array with all the transactions.
 * @param {*} file
 */
export function processCsv(data) {
  const cleanedCsv = cleanTransactionsLines(data);
  const result = parseTransactions(prefixWithTransactionCount(cleanedCsv));
  return result;
}

/**
 * Parses an ammount and ensures it is valid.
 * Always returns valid numeric.
 * Never returns null or empty.
 *
 * @param {*} amount
 */
export function safeParseAmount(amount) {
  if (amount == null || amount === "") {
    return "0";
  }
  return amount;
}

/**
 * Parse localized ING data and returns a Date object.
 * @param {*} date
 */
export function localDateToLocalDateIsoFormat(date) {
  try {
    const result = parse(date, 'dd MMMM yyyy', new Date(), {
      locale: ro
    });
    // console.log(`Date is '${date}' - ${result}`);
    return formatISO(result, { representation: 'date' })

  } catch (e) {
    return "2050-01-01";
  }
}

/**
 * Converts a transaction row from CSV to a transaction object.
 * Parses details and does some input sanitisation.
 *
 * @param {*} txNumber
 * @param {*} rows
 */
export function buildTransaction(txNumber, rows) {
  const firstRow = rows[0];

  const debit = safeParseAmount(firstRow[5]),
    credit = safeParseAmount(firstRow[7]),
    balance = safeParseAmount(firstRow[8]);

  const details = rows.slice(1).map((cols) => cols[4]);

  let parsedDetails = {};

  _.forEach(details, (str) => {
    if (str.indexOf(":") > 0) {
      let s = str.split(":", 2);
      parsedDetails[s[0]] = s[1];
    } else {
      parsedDetails[str] = str;
    }
  });

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

/**
 * Parse multi-line transactions rows from the CSV.
 * Converts each multi-line transaction to a single transaction object.
 * Returns a the array of transaction objects.
 *
 * @param {*} transactionLines
 */
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

/**
 * Parse a CSV string or File object received as parameter.
 * Returns a list of rows as array.
 *
 * @param {*} csvData
 */
export function parseCsv(csvData) {
  const csv = Papa.parse(csvData);
  //   console.log(csv);

  return csv;
}
