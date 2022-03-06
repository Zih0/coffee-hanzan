import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Cover from "../components/Feed/Cover";
import { API } from "../firebase/api";
import { IUser } from "../utils/types";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 90%;
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
      history.push("/");
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
    </Container>
  );
}

export default Feed;
