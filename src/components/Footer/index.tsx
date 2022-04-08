import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.color.gray_100};

    .wrapper {
        max-width: 1240px;
        width: 92%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .footer-text {
        font-size: 12px;
        font-weight: 300;
    }

    .contact-wrapper {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;

function Footer() {
    return (
        <Container>
            <div className="wrapper">
                <span className="footer-text">2022 커피한잔</span>
                <div className="contact-wrapper">
                    <span className="footer-text">about</span>|
                    <div className="footer-text">feedback</div>
                </div>
            </div>
        </Container>
    );
}

export default Footer;
