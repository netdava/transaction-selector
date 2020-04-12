import React, { useState } from "react";
import ReactDOM from "react-dom";
import "@atlaskit/css-reset";

import Transactions from './components/Transactions';
import Column from "./column";
import TransactionFileImport from "./components/TransactionFileImport";

import initialData from "./data/2017.json";
import initialAccounts from "./data/accounts.json";

const HomeBank = () => (
  <a href="https://homebank.ro" target="_blank" rel="noreferrer noopener">
    homebank.ro
  </a>
);

function Introduction() {
  return (
    <div className="container-fluid">
      <div className="row my-3">
        <div className="col-md-12">
          <h2>Assign transactions to accounts</h2>
          <p>
            Simple application to assign transactions exported from ING HomeBank
            to accounts. Used by tools like{" "}
            <a
              href="https://hledger.org/"
              target="_blank"
              rel="noreferrer noopener"
            >
              hledger
            </a>{" "}
            from{" "}
            <a
              href="https://plaintextaccounting.org/"
              target="_blank"
              rel="noreferrer noopener"
            >
              plaintextaccounting.org
            </a>
          </p>
          <h3>Steps to use the application</h3>
          <ul>
            <li>
              Export transactions from <HomeBank />{" "}
            </li>
            <li>
              Export accounts from <strong>ledger/hledger</strong> using{" "}
              <code>hledger accounts</code> command.
            </li>
            <li>Import both accounts and transcations list here</li>
            <li>Assign each transaction to an account by dragging it over</li>
            <li>Export transactions list as JSON or hledger format</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [transactions, setTransactions] = useState(initialData);
  const [accounts, setAccounts] = useState(initialAccounts);

  return (
    <>
      <Introduction />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <textarea
              className="form-control"
              rows="5"
              placeholder="Accounts list:"
            ></textarea>
          </div>
          <div className="col-md-4">
            <button
              type="button"
              className="btn btn-outline-primary btn-block mb-2"
            >
              Update Accounts list
            </button>
            <TransactionFileImport setTransactions={setTransactions} />
            <button
              type="button"
              className="btn btn-outline-primary btn-block mt-2"
            >
              Export data
            </button>
          </div>
          <div className="col-md-4"></div>

          <div className="col-md-4">
            <Column
              key="accounts-column"
              title="Accounts"
              accounts={accounts}
            />
          </div>
          <div className="col-md-4">
            <Column title="Assigned transactions" />
          </div>
          <div className="col-md-4">
            <Transactions
              key="transactions-column"
              transactions={transactions}
            />
          </div>
        </div>
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
