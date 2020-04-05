import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    border: 1px solid lightgray;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    
`;

export default class Task extends React.Component {
    render() {
        const { transaction, account } = this.props;
        return (
            <Container>
                {transaction && transaction.title}
                {account && account}
            </Container>
        )
    }
}
