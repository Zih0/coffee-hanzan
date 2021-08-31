import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../contexts/AuthContext';

const Container = styled.main`
  display: flex;
  flex-direction: column;
`;

function Feed() {
  const { hasNickname } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (!hasNickname) {
      history.push('/setting');
    }
  }, []);
  return <Container>Feed</Container>;
}

export default Feed;
