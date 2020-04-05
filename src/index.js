import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';

import initialData from './data/2017.json';
import accounts from './data/accounts.json';
import Column from './column';

const Container = styled.div`
  display: flex;
`;

const data = {
  transactions : initialData,
  accounts: accounts
}

class App extends React.Component {
  state = data;

  render() {
    return (
      <Container>
        <Column key="transactions-column" title="Transactions" transactions={this.state.transactions} />
        <Column key="accounts-column" title="Accounts" accounts={this.state.accounts} />
      </Container>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
