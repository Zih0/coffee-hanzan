import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AuthContext, useAuth } from "../contexts/AuthContext";
import { API } from "../firebase/api";

const Container = styled.main`
  display: flex;
  flex-direction: column;
`;

function Feed() {
  const auth = useAuth();
  const { setUser } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    API.getUserData(auth?.uid).then((user) => {
      if (!user.nickname) history.push("/setting");
      else setUser(user);
    });
  }, []);

  return <Container>Feed</Container>;
}

export default Feed;
