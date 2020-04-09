import { parseCsv, cleanTransactionsLines, prefixWithTransactionCount, parseTransactions } from "../ing-parser";
import fs from "fs";

test("parser to parse the test data", () => {
  const csvString = fs.readFileSync("./src/__tests__/transactions.csv", "utf8");
  const csvData = parseCsv(csvString);
  const { data, errors } = csvData;

  expect(errors.length).toBe(0);
  expect(data.length).toBe(1223);
});

test("clean transaction lines works", () => {
  const csvString = fs.readFileSync("./src/__tests__/transactions.csv", "utf8");
  const csvData = parseCsv(csvString);
  const { data } = csvData;

  const cleanedCsv = cleanTransactionsLines(data);

  const r = parseTransactions(prefixWithTransactionCount(cleanedCsv));
  console.log(r);

  // console.log(cleanedCsv);
  console.log(cleanedCsv.length);

  expect(cleanedCsv.length).toBe(1118);
});


test("prefix with transaction count", () => {

  const data = [['a','b'], ['c','d']]

  const result = prefixWithTransactionCount(data);

  // console.log(result);
  expect(result.length).toBe(2);
  expect(result[0].length).toBe(3);
  expect(result[0][0]).toBe(1);

})