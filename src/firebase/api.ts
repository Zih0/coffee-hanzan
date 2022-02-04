import { dbService } from "./fbase";

interface IUserObj {
  nickname: string;
  createdAt: number;
  creatorId: string | undefined;
}

const getUserDocument = async (uid: string | undefined) => {
  const exUser = await dbService
    .collection("users")
    .where("creatorId", "==", uid)
    .get();
  return exUser.docs;
};

const getUserData = async (uid: string | undefined) => {
  const docs = await getUserDocument(uid);
  let user: any;
  docs.forEach((doc) => {
    user = doc.data();
  });
  return user;
};

const setUserData = async (userObj: IUserObj) => {
  await dbService.collection("users").add(userObj);
};

const checkDuplicateNickName = async (
  uid: string | undefined,
  nickname: string
) => {
  nickname = nickname.toLowerCase();
  
  const exNickname = await dbService
    .collection("users")
    .where("creatorId", "!=", uid)
    .where("nickname", "==", nickname)
    .get();
  if (exNickname.docs.length !== 0) return false;
  return true;
};

const setAccountData = async (
  uid: string | undefined,
  bank: string,
  account: string
) => {
  const docRef = await getUserDocument(uid);

  docRef.forEach((doc) => {
    dbService.collection("users").doc(doc.id).update({
      bank,
      account,
    });
  });
};

const updateUserNickname = async (
  uid: string | undefined,
  nickname: string
) => {
  nickname = nickname.toLowerCase();

  const docRef = await getUserDocument(uid);

  docRef.forEach((doc) => {
    dbService.collection("users").doc(doc.id).update({
      nickname,
    });
  });
};

export const API = {
  getUserDocument,
  getUserData,
  setUserData,
  checkDuplicateNickName,
  setAccountData,
  updateUserNickname,
};
