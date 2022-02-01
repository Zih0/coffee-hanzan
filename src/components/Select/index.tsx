import React from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  padding: 1rem 7rem 1rem 1rem;
  background-color: #f4f4f4;
  border: 1px solid #bfbfbf;
  border-radius: 8px;
`;

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

function Select({ ...props }: IProps) {
  return <StyledSelect {...props} />;
}

export default Select;
