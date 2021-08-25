import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 1rem 7rem 1rem 1rem;
  background-color: #f4f4f4;
  border: 1px solid #bfbfbf;
  border-radius: 5px;
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {}

function Input({ ...props }: IProps) {
  return <StyledInput {...props} />;
}

export default Input;
