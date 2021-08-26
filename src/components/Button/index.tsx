import styled from 'styled-components';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'white' | 'black';
  background?: string;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const StyledButton = styled.button<IButtonProps>`
  border: 1px solid transparent;
  padding: 0.75rem 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: #fff;
  font-size: ${(props) =>
    props.size === 'sm' ? '0.8rem' : props.size === 'md' ? '1.2rem' : '1.5rem'};
  font-weight: 300;
  transition: all 0.3s;
  cursor: pointer;
  background-color: ${(props) => props.background || 'black'};
  color: ${(props) => props.color || 'white'};
  &:hover {
    font-weight: 500;
  }
`;

function Button({ size, color, background, children, ...props }: IButtonProps) {
  return (
    <StyledButton background={background} color={color} size={size} {...props}>
      {children}
    </StyledButton>
  );
}

export default Button;
