import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    border: 1px solid lightgray;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    
`;

function Account(props) {
    const { account } = props;
    return (
        <Container>
            {account && account}
        </Container>
    )
}

export default Account;
