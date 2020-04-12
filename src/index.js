import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';

import initialData from './data/2017.json';
import accounts from './data/accounts.json';
import Column from './column';

const data = {
  transactions: initialData,
  accounts: accounts
}

class App extends React.Component {
  state = data;

  render() {
    return (
      <>
        <div className="jumbotron">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <h2>Transactions selector</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <textarea className="form-control" rows="5"></textarea>
            </div>
            <div className="col-md-4">
              <button type="button" className="btn btn-outline-primary btn-block mb-2">Update Accounts list</button>
              <div className="input-group my-2">
                <div className="input-group-prepend">
                  <button className="btn btn-outline-primary" type="button" id="inputGroupFileAddon03">Import transactions</button>
                </div>
                <div className="custom-file">
                  <input type="file" className="custom-file-input" id="inputGroupFile03" ariaDescribedby="inputGroupFileAddon03" />
                  <label className="custom-file-label" for="inputGroupFile03">*.csv/Excell file...</label>
                </div>
              </div>
              <button type="button" className="btn btn-outline-primary btn-block mt-2">Export data</button>
            </div>
            <div className="col-md-4"></div>

            <div className="col-md-4">
              <Column key="accounts-column" title="Accounts" accounts={this.state.accounts} />
            </div>
            <div className="col-md-4">
              <Column title="Selected acount's transactions" />
            </div>
            <div className="col-md-4">
              <Column key="transactions-column" title="Transactions" transactions={this.state.transactions} />
            </div>
          </div>
        </div>
      </>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
