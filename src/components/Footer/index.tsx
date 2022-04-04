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
    }

    .copyright {
        font-size: 12px;
        font-weight: 300;
    }
`;

function Footer() {
    return (
        <Container>
            <div className="wrapper">
                <span className="copyright">2022 커피한잔</span>
            </div>
        </Container>
    );
}

export default Footer;
