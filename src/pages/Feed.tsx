import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthContext";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 90%;
`;

function Feed() {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (!user.nickname) history.push("/setting");
  }, []);

  return <Container></Container>;
}

export default Feed;
