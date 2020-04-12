import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    border: 1px solid lightgray;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    display: flex;
    flex-direction: row;
`;

const Date = styled.div`
    border: 1px solid #a9a9a9;
    display: flex;
    flex-direction: column;
    padding: 2px 10px;
    align-content: center;
    border-radius: 4px;
    max-height: 50px;
    
`;
const Day = styled.div`
    text-align:center;
    font-weight: bold;
    font-size: 16px;
`;
const Month = styled.div`
`;
const Details = styled.div`
    display: flex;
    flex-direction:column;
    padding: 5px;
    flex-grow: 1;
`;
const Info = styled.div``;

const Line = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`;
const Title = styled.div`
    font-size: 12px;
    color: #a9a9a9;
    display: flex;
`;
const Sum = styled.div`
    display: flex;
    font-size: 12px;
    color: #a9a9a9;
`;
const Button = styled.button`
 
`;

function AssignedTransaction() {
    return (
        <Container>
            <Date>
                <Day>18</Day>
                <Month>Aug</Month>
            </Date>
            <Details>
                <Info>Journey in the center of the Earth</Info>
                <Line>
                    <Title>Adventures</Title>
                    <Sum className="text-danger">500</Sum>
                </Line>
                <Line>
                    <Title className="text-info">From: Assets:INGB:Cont Curent</Title>
                    <Title className="text-info">To: Expenses:Adventures</Title>
                    <Button>switch</Button>
                </Line>
            </Details>
        </Container>
    )
}

export default AssignedTransaction;
