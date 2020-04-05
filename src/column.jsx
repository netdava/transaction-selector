import React from 'react';
import styled from 'styled-components';
import Task from './task';

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
const TaskList = styled.div`
    padding: 8px;
  
`;

export default class Column extends React.Component {
    render() {
        return (
            <Container>
                <Title>{this.props.title}</Title>
                <TaskList>
                    {this.props.transactions && this.props.transactions.map(
                        function (transaction) {
                            return (
                                <Task transaction={transaction} />
                            )
                        }
                    )}
                    {this.props.accounts &&  this.props.accounts.map(
                        function(account) {
                            return (
                                <Task account={account} />
                            )
                        }
                    )}
                </TaskList>
            </Container>
        );
    }
}