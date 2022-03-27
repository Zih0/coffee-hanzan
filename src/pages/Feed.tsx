import { IUser } from '@utils/types';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Avatar from '@components/Feed/Avatar';
import Cover from '@components/Feed/Cover';
import Support from '@components/Feed/Support';
import UserInfo from '@components/Feed/UserInfo';
import Footer from '@components/Footer';

import { API } from '@firebase/api';

const Container = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;

    .main-wrapper {
        width: 100%;
        margin-top: 60px;
        max-width: 1024px;
        display: flex;
        gap: 24px;
        justify-content: space-between;
        margin-bottom: 100px;

        > div {
            flex: 1;
        }

        @media ${({ theme }) => theme.size.mobile} {
            flex-direction: column;
            gap: 16px;
        }
    }
`;

interface IParams {
    nickname: string;
}

function Feed() {
    const params = useParams<IParams>();
    const history = useHistory();
    const [feedData, setFeedData] = useState<IUser>();

    const getFeedUserData = async (nickname: string) => {
        const res = await API.getFeedData(nickname);

        handleFeedData(res);
    };

    const handleFeedData = (res: any) => {
        if (!res) {
            history.push('/');
            return;
        }
        setFeedData(res);
    };

    useEffect(() => {
        getFeedUserData(params.nickname);
    }, []);

    return (
        <Container>
            <Cover coverImgUrl={feedData?.coverImgUrl} />
            <Avatar avatarImgUrl={feedData?.avatarImgUrl} />
            <div className="main-wrapper">
                <UserInfo
                    introduction={feedData?.introduction}
                    socialData={feedData?.socialData}
                />
                <Support />
            </div>
            <Footer />
        </Container>
    );
}

export default Feed;
