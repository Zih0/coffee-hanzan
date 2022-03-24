import { authService, dbService, storageService } from '@firebase/fbase';

interface IUserObj {
    nickname: string;
    createdAt: number;
    creatorId: string | undefined;
}

const getUserDocument = async (uid: string | undefined) => {
    const exUser = await dbService
        .collection('users')
        .where('creatorId', '==', uid)
        .get();
    return exUser.docs;
};

const getUserData = async (uid: string | undefined) => {
    const docs = await getUserDocument(uid);
    let user;
    docs.forEach((doc) => {
        user = doc.data();
    });
    return user;
};

const setUserData = async (userObj: IUserObj) => {
    userObj = Object.assign(userObj, {
        nickname: userObj.nickname.toLowerCase(),
        introduction: 'Buy me an iced americano.😃',
    });
    await dbService.collection('users').add(userObj);
};

const checkDuplicateNickName = async (
    uid: string | undefined,
    nickname: string,
) => {
    nickname = nickname.toLowerCase();

    const exNickname = await dbService
        .collection('users')
        .where('creatorId', '!=', uid)
        .where('nickname', '==', nickname)
        .get();
    if (exNickname.docs.length !== 0) return false;
    return true;
};

const setAccountData = async (
    uid: string | undefined,
    bank: string,
    account: string,
) => {
    const docRef = await getUserDocument(uid);

    docRef.forEach((doc) => {
        dbService.collection('users').doc(doc.id).update({
            bank,
            account,
        });
    });
};

const updateUserNickname = async (
    uid: string | undefined,
    nickname: string,
) => {
    nickname = nickname.toLowerCase();

    const docRef = await getUserDocument(uid);
    docRef.forEach((doc) => {
        dbService.collection('users').doc(doc.id).update({
            nickname,
        });
    });
};

const updateUserIntroduction = async (uid: string, introduction: string) => {
    const docRef = await getUserDocument(uid);

    docRef.forEach((doc) => {
        dbService.collection('users').doc(doc.id).update({
            introduction,
        });
    });
};

interface ISocial {
    github?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    blog?: string;
}

const updateUserSocialData = async (uid: string, socialObj: ISocial) => {
    const docRef = await getUserDocument(uid);

    docRef.forEach((doc) => {
        dbService.collection('users').doc(doc.id).update({
            socialData: socialObj,
        });
    });
};

const uploadUserPhoto = async (file: File) => {
    const image = storageService
        .ref()
        .child(`/avatars/${Date.now()}.${file.name.split('.')[1]}`);
    await image.put(file);
    return await image.getDownloadURL();
};

const setUserPhoto = async (uid: string, avatarImgUrl: string) => {
    const docRef = await getUserDocument(uid);

    docRef.forEach((doc) => {
        dbService.collection('users').doc(doc.id).update({
            avatarImgUrl,
        });
    });
};

const uploadUserCover = async (blob: Blob) => {
    const image = storageService.ref().child(`/covers/${Date.now()}.jpeg`);
    await image.put(blob);
    return await image.getDownloadURL();
};

const setUserCover = async (uid: string, coverImgUrl: string) => {
    const docRef = await getUserDocument(uid);

    docRef.forEach((doc) => {
        dbService.collection('users').doc(doc.id).update({
            coverImgUrl,
        });
    });
};

const getFeedDocument = async (nickname: string) => {
    const user = await dbService
        .collection('users')
        .where('nickname', '==', nickname)
        .get();
    return user.docs;
};

const getFeedData = async (nickname: string) => {
    const docs = await getFeedDocument(nickname);
    let user;
    docs.forEach((doc) => {
        user = doc.data();
    });
    return user;
};

const logout = async () => {
    return await authService.signOut();
};

export const API = {
    getUserDocument,
    getUserData,
    setUserData,
    checkDuplicateNickName,
    setAccountData,
    updateUserNickname,
    updateUserIntroduction,
    updateUserSocialData,
    uploadUserPhoto,
    setUserPhoto,
    uploadUserCover,
    setUserCover,
    getFeedData,
    logout,
};
