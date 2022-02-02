import styled from "styled-components";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "white" | "black";
  background?: string;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  width?: number;
  height?: number;
}

const StyledButton = styled.button<IButtonProps>`
  min-width: 6rem;
  width: ${(props) => `${props.width}rem`};
  height: ${(props) => `${props.height}rem`};
  border: 1px solid transparent;
  padding: 0.75rem 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  color: #fff;
  font-size: ${(props) =>
    props.size === "sm" ? "0.8rem" : props.size === "md" ? "1.2rem" : "1.5rem"};
  font-weight: 300;
  cursor: pointer;
  background-color: ${(props) => props.background || "black"};
  color: ${(props) => props.color || "white"};
  &:hover {
    font-weight: 500;
  }
`;

function Button({ children, ...props }: IButtonProps) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

export default Button;
