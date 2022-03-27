import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import Button from '@components/common/Button';

import { Providers, authService } from '@firebase/fbase';

interface IAuthSNSProps {
    direction?: 'row' | 'column';
}

function AuthSNS({ direction = 'row' }: IAuthSNSProps) {
    const onSocialClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = e;
        if (name === 'google') {
            await authService.signInWithPopup(Providers.google);
        } else if (name === 'github') {
            await authService.signInWithPopup(Providers.github);
        }
    };

    return (
        <Container direction={direction}>
            <Button name="google" onClick={onSocialClick}>
                <p className="auth-btn">
                    구글로 로그인
                    <FontAwesomeIcon icon={faGoogle} />
                </p>
            </Button>
            <Button name="github" onClick={onSocialClick}>
                <p className="auth-btn">
                    깃허브로 로그인
                    <FontAwesomeIcon icon={faGithub} />
                </p>
            </Button>
        </Container>
    );
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

export default AuthSNS;
