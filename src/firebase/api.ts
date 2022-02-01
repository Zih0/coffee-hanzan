import { dbService } from "./fbase";

interface IUserObj {
  nickname: string;
  createdAt: number;
  creatorId: string | undefined;
}

const getUserData = async (uid: string | undefined) => {
  const exUser = await dbService
    .collection("users")
    .where("creatorId", "==", uid)
    .get();
  return exUser.docs;
};

const setUserData = async (userObj: IUserObj) => {
  await dbService.collection("users").add(userObj);
};

const checkDuplicateNickName = async (nickname: string) => {
  const exNickname = await dbService
    .collection("users")
    .where("nickname", "==", nickname)
    .get();
  if (exNickname.docs.length !== 0) return false;
  return true;
};

const setAccountData = async (
  uid: string | undefined,
  bank: string,
  account: number
) => {
  const snapshot = await getUserData(uid);

  snapshot.forEach((doc) => {
    dbService.collection("users").doc(doc.id).update({
      bank,
      account,
    });
  });
};

export const API = {
  getUserData,
  setUserData,
  checkDuplicateNickName,
  setAccountData,
};
