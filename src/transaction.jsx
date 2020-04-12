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

const Date = styled.span`
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
    return (
        <Container>
            <Details>
                <Info>{Detalii ? Detalii : Beneficiar ? Beneficiar : ' - '}</Info>
                <Date>{date}</Date>
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
