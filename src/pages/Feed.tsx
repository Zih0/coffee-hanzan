import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthContext";
import { API } from "../firebase/api";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Feed() {
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    API.getUserData(user.creatorId).then((fbUser) => {
      if (!fbUser?.nickname) history.push("/setting");
      else setUser(fbUser);
    });
  }, []);

  return <Container></Container>;
}

export default Feed;
