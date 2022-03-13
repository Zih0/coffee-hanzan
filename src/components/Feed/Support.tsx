import React, { useState } from "react";
import styled from "styled-components";
import { IconLogoToss } from "../../assets/icons";
import useModal from "../../hooks/useModal";
import { COFFEE_PRICE } from "../../utils/constants";
import Button from "../common/Button";
import SupportModal from "../Modal/SupportModal";

const Container = styled.div`
    width: 100%;
    padding: 12px;
    
    .support-wrapper {
        width: 100%;
        border-radius: 14px;
        padding: 16px;
        box-shadow: 1px 0 4px rgb(0 2 4 / 6%), 0 7px 18px rgb(1 1 1 / 5%);
    }

    .support-title {
      font-size: 20px;
      font-weight: 600;
    }

    .support-coffee-wrapper {
      padding: 24px 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      width: 100%;
    }

    .circle {
      width: 40px;
      height: 40px;
      display:flex;
      justify-content: center;
      align-items: center;
      font-size: 25px;
      border-radius: 50%;
      background-color: rgba(0,0,0,0.1);
    }

    .support-count-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;

      input {
        display: none;

        &:checked + label.support-count {
        background-color: ${({ theme }) => theme.color.black};
        color: ${({ theme }) => theme.color.white};
      }
      }
    }

    label.support-count {
      border: 1px solid ${({ theme }) => theme.color.black};
      background-color: ${({ theme }) => theme.color.white};
      font-size: 16px;
      font-weight: 900;
      cursor: pointer;

    }

    .support-button-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .x-icon {
      font-size: 24px;
      padding-bottom: 6px;
    }
}
`;

const SupportButton = styled(Button)`
  background-color: #0064ff;
  color: ${({ theme }) => theme.color.white};
  font-size: 16px;
  padding: 0.4rem 1.5rem;

  img {
    width: 36px;
  }
`;
function Support() {
  const [amount, setAmount] = useState(0);
  const { openModal, closeModal, ModalPortal } = useModal();

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    const count = parseInt(value);
    setAmount(count * COFFEE_PRICE);
  };

  const onSubmitSupport = () => {
    openModal();
  };

  return (
    <>
      <Container>
        <div className="support-wrapper">
          <p className="support-title">후원하기</p>
          <div className="support-coffee-wrapper">
            <div className="circle">☕️</div>
            <span className="x-icon">x</span>
            <div className="support-count-wrapper">
              <input
                id="count-1"
                type="radio"
                value="1"
                name="count"
                onChange={onChangeAmount}
              />
              <label className="circle support-count" htmlFor="count-1">
                1
              </label>
              <input
                id="count-3"
                type="radio"
                value="3"
                name="count"
                onChange={onChangeAmount}
              />
              <label className="circle support-count" htmlFor="count-3">
                3
              </label>
              <input
                id="count-5"
                type="radio"
                value="5"
                name="count"
                onChange={onChangeAmount}
              />
              <label className="circle support-count" htmlFor="count-5">
                5
              </label>
            </div>
          </div>
          <div className="support-button-wrapper">
            <SupportButton onClick={onSubmitSupport}>
              <img src={IconLogoToss} alt="toss" /> 토스로 후원하기
            </SupportButton>
          </div>
        </div>
      </Container>
      <ModalPortal>
        <SupportModal amount={amount} />
      </ModalPortal>
    </>
  );
}

export default Support;
