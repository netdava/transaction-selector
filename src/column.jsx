import React from 'react';
import styled from 'styled-components';
import Transaction from './transaction';
import Account from './account';
import AssignedTransaction from './assigned-transaction';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgray;
    border-radius: 2px;
    height: 600px;
    overflow: scroll;
    overflow-x: hidden;

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
                    <form>
                        <div className="row">
                            {this.props.title === 'Transactions' &&
                                <div className="col-md-12">
                                    <div className="input-group input-group-sm mb-3">
                                        <div className="input-group-prepend">
                                            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Source Account</button>
                                            <div className="dropdown-menu">
                                               acounts...
                                </div>
                                        </div>
                                        <input type="text" className="form-control" aria-label="Text input with dropdown button"></input>
                                    </div>
                                </div>
                            }

                            <div className="col-md-6">
                                <div className="input-group input-group-sm mb-3">
                                    <div className="input-group-prepend">
                                        <button className="btn btn-outline-success" type="submit">Search</button>
                                    </div>
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                </div>
                            </div>
                            {this.props.title === 'Transactions' &&
                                <div className="col-md-6">
                                    <div className="btn-group btn-group-sm">
                                        <button type="button" className="btn btn-outline-secondary">All transactions</button>
                                        <button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                                            <span className="sr-only">Toggle Dropdown</span>
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuReference">
                                            <a className="dropdown-item" href="1">Expences</a>
                                            <a className="dropdown-item" href="2">Incomes</a>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
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
                    {this.props.title === "Assigned transactions" &&
                        <AssignedTransaction />
                    }
                </Items>
            </Container>
        );
    }
}