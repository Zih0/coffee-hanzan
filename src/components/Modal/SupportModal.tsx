import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import QR from "../common/QR/QR";

const Container = styled.div`
  padding: 3rem;
  background-color: #fff;
  z-index: 11;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-radius: 16px;
`;

interface ISupportModalProps {
  amount: number;
}

function SupportModal({ amount }: ISupportModalProps) {
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <QR
        bank={user.bank as string}
        account={user.account as string}
        amount={amount}
      />
    </Container>
  );
}

export default SupportModal;
