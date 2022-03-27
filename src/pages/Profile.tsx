import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import ProfileForm from '@components/Profile/ProfileForm';
import TopSection from '@components/Profile/TopSection';

import { AuthContext } from '@contexts/AuthContext';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;

    .wrapper {
        max-width: 960px;
        width: 100%;
        padding: 2rem 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

function Profile() {
    const { user } = useContext(AuthContext);
    const history = useHistory();

    useLayoutEffect(() => {
        if (!user.nickname) history.push('/setting');
    }, []);

    return (
        <Container>
            <TopSection />
            <div className="wrapper">
                <ProfileForm />
            </div>
        </Container>
    );
}

export default Profile;
