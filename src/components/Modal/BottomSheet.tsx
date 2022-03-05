import React from "react";
import styled from "styled-components";
import { useBottomSheet } from "../../hooks/useBottomSheet";

function BottomSheet() {
  const { sheetRef } = useBottomSheet();
  return (
    <Container ref={sheetRef}>
      <Wrapper>
        <Handle />
      </Wrapper>
      <Content>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: #fff;
  transition: transform 150ms ease-out;
`;

const Content = styled.div`
  background-color: #fff;
  max-height: 20px;
  overflow-y: auto;
`;

const Wrapper = styled.div`
  background-color: #fff;
  height: 48px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  position: relative;
  padding-top: 16px;
  padding-bottom: 4px;
  box-shadow: 0 -1px 5px 0 rgba(0, 0, 0, 0.8);
`;

const Handle = styled.div`
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background-color: #d0d0d0;
  margin: auto;
`;

export default BottomSheet;
