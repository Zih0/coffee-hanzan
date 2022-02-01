import React, { useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { API } from "../firebase/api";

const Container = styled.main`
  display: flex;
  flex-direction: column;
`;

function Feed() {
  const auth = useAuth();
  const history = useHistory();

  useLayoutEffect(() => {
    API.getUserData(auth?.uid).then((user) => {
      if (!user.length) history.push("/setting");
    });
  }, []);

  return <Container>Feed</Container>;
}

export default Feed;
