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

const Footer = styled.div`
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

function Transaction(props) {
    const { transaction } = props;
    const { title, date, parsedDetails: { Detalii, Beneficiar }, credit, debit } = transaction;
    const resetDate = new window.Date(date);
    const day = resetDate.getDate();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[resetDate.getMonth()];

    return (
        <Container>
            <Date>
                <Day>{day}</Day>
                <Month>{month}</Month>
            </Date>
            <Details>
                <Info>{Detalii ? Detalii : Beneficiar ? Beneficiar : ' - '}</Info>
                <Footer>
                    <Title>{title}</Title>
                    <Sum>{credit === '0' ? 
                        <span className="text-danger">{debit}</span> : 
                        <span className="text-success">{credit}</span>}</Sum>
                </Footer>
            </Details>
        </Container>
    )
}

export default Transaction;
