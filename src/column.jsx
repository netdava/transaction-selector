import React from 'react';
import styled from 'styled-components';
import Transaction from './transaction';
import Account from './account';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgray;
    border-radius: 2px;

    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
`;
const Items = styled.div`
    padding: 8px;
`;
const Filter = styled.div`
    padding: 8px;
`;

export default class Column extends React.Component {
    render() {
        return (
            <Container>
                <Title>{this.props.title}</Title>
                <Filter>
                    <form class="form-inline">
                        {this.props.title === 'Transactions' &&
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Source Account</button>
                                    <div class="dropdown-menu">
                                        ...
                                </div>
                                </div>
                                <input type="text" class="form-control" aria-label="Text input with dropdown button"></input>
                            </div>
                        }

                        <div class="input-group input-group-sm mb-3">
                            <div class="input-group-prepend">
                                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </div>
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        </div>
                        {this.props.title === 'Transactions' &&
                            <>
                                <div class="btn-group">
                                    <button class="btn btn-outline-secondary btn-sm" type="button">
                                        All transactions
                                </button>
                                    <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="sr-only">Toggle Dropdown</span>
                                    </button>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="1">All</a>
                                        <a class="dropdown-item" href="2">Credit transactions</a>
                                        <a class="dropdown-item" href="3">Debit transactions</a>
                                    </div>
                                </div>
                            </>
                        }
                    </form>
                </Filter>
                <Items>
                    {this.props.transactions && this.props.transactions.map(
                        function (transaction) {
                            return (
                                <Transaction transaction={transaction} />
                            )
                        }
                    )}
                    {this.props.accounts && this.props.accounts.map(
                        function (account) {
                            return (
                                <Account account={account} />
                            )
                        }
                    )}
                </Items>
            </Container>
        );
    }
}