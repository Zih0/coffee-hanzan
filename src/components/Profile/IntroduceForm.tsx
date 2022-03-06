import React, { useContext, useState } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import { API } from "../../firebase/api";
import Button from "../common/Button";

const Form = styled.form`
  width: 50%;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.color.gray};
  border-radius: 8px;

  @media ${({ theme }) => theme.size.mobile} {
    width: 100%;
  }

  .profile-form-label {
    font-size: 1rem;
    font-weight: 700;
    text-align: left;
    margin-bottom: 0.5rem;
  }

  .profile-form-textarea {
    width: 100%;
    height: 5rem;
    padding: 0.5rem;
    background-color: #f4f4f4;
    border: 1px solid #bfbfbf;
    border-radius: 8px;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
`;

function IntroduceForm() {
  const { user } = useContext(AuthContext);
  const [introduction, setIntroduction] = useState(user.introduction ?? "");
  const [loading, setLoading] = useState(false);

  const onChangeIntroduction = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = e;

    setIntroduction(value);
  };

  const onSubmitIntroduction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      await API.updateUserIntroduction(user.creatorId, introduction);
      setLoading(false);

      // TODO: 자기소개 변경 성공 토스트
    } catch (error: any) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmitIntroduction}>
      <div>
        <p className="profile-form-label">자기소개</p>
        <div>
          <textarea
            className="profile-form-textarea"
            placeholder="자기소개를 입력해주세요."
            value={introduction}
            onChange={onChangeIntroduction}
          />
          <StyledButton size="sm" type="submit">
            {!loading ? (
              "자기소개 수정하기"
            ) : (
              <FontAwesomeIcon icon={faSpinner} spin={true} />
            )}
          </StyledButton>
        </div>
      </div>
    </Form>
  );
}

export default IntroduceForm;
