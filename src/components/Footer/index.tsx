import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  .contact-email {
    font-size: 12px;
    font-weight: 600;
  }
`;

function Footer() {
  return (
    <Container>
      <span className="contact-email">커피한잔 | ziho@kakao.com</span>
    </Container>
  );
}

export default Footer;
