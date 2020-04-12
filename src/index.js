import React from "react";
import ReactDOM from "react-dom";
import "@atlaskit/css-reset";

import initialData from "./data/2017.json";
import accounts from "./data/accounts.json";
import Column from "./column";

const data = {
  transactions: initialData,
  accounts: accounts,
};

const HomeBank = () => <a href="https://homebank.ro">homebank.ro</a>;

class App extends React.Component {
  state = data;

  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="row my-3">
            <div className="col-md-12">
              <h2>Assign transactions to accounts</h2>
              <p>
                Simple application to assign transactions exported from ING
                HomeBank to accounts. Used by tools like{" "}
                <a href="https://hledger.org/">hledger</a> from{" "}
                <a href="https://plaintextaccounting.org/">
                  plaintextaccounting.org
                </a>
              </p>
              <h3>Steps to use the application</h3>
              <ul>
                <li>
                  Export transactions from <HomeBank />{" "}
                </li>
                <li>
                  Export accounts from <strong>ledger/hledger</strong> using
                  hledger accounts
                </li>
                <li>Import both accounts and transcations list here</li>
                <li>
                  Assign each transaction to an account by dragging it over
                </li>
                <li>Export transactions list</li>
              </ul>
            </div>
          </div>
        </div>
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
              <div className="input-group my-2">
                <div className="input-group-prepend">
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    id="inputGroupFileAddon03"
                  >
                    Import transactions
                  </button>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile03"
                    aria-describedby="inputGroupFileAddon03"
                  />
                  <label className="custom-file-label" htmlFor="inputGroupFile03">
                    *.csv export from{" "}
                    <a href="https://homebank.ro">homebank.ro</a>
                  </label>
                </div>
              </div>
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
                accounts={this.state.accounts}
              />
            </div>
            <div className="col-md-4">
              <Column title="Assigned transactions" />
            </div>
            <div className="col-md-4">
              <Column
                key="transactions-column"
                title="Transactions"
                transactions={this.state.transactions}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
