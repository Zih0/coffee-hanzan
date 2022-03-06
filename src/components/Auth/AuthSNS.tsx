import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { authService, Providers } from "../../firebase/fbase";
import Button from "../common/Button";

interface IAuthSNSProps {
  direction?: "row" | "column";
}

const Container = styled.div<IAuthSNSProps>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: 1rem;

  .auth-btn {
    display: flex;
    gap: 0.5rem;
    font-size: 0.7rem;
    align-items: center;
    svg {
      font-size: 1.3rem;
    }
  }
`;

function AuthSNS({ direction = "row" }: IAuthSNSProps) {
  const onSocialClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    if (name === "google") {
      await authService.signInWithPopup(Providers.google);
    } else if (name === "github") {
      await authService.signInWithPopup(Providers.github);
    }
  };

  return (
    <Container direction={direction}>
      <Button size="sm" name="google" onClick={onSocialClick}>
        <p className="auth-btn">
          구글로 로그인
          <FontAwesomeIcon icon={faGoogle} />
        </p>
      </Button>
      <Button size="sm" name="github" onClick={onSocialClick}>
        <p className="auth-btn">
          깃허브로 로그인
          <FontAwesomeIcon icon={faGithub} />
        </p>
      </Button>
    </Container>
  );
}

export default AuthSNS;
