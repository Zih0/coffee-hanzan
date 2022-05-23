import { AUHT_PROVIDER } from '@constants';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useModal from '@hooks/useModal';
import styled from 'styled-components';

import Button from '@components/common/Button';

import { Providers, authService } from '@firebase/fbase';

interface IAuthSNSProps {
    direction?: 'row' | 'column';
}

function AuthSNS({ direction = 'row' }: IAuthSNSProps) {
    const { closeCurrentModal } = useModal();

    const onSocialClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = e;
        if (name === AUHT_PROVIDER.GOOGLE) {
            await authService.signInWithPopup(Providers.google);
        } else if (name === AUHT_PROVIDER.GITHUB) {
            await authService.signInWithPopup(Providers.github);
        }

        closeCurrentModal();
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
