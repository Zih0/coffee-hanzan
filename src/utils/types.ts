export interface ISocial {
    github?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    blog?: string;
}

export interface IUser {
    creatorId: string;
    createdAt?: number;
    nickname?: string;
    bank?: string;
    account?: string;
    avatarImgUrl?: string;
    coverImgUrl?: string;
    introduction?: string;
    socialData?: ISocial;
}
