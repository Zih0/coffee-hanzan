import ImageUploadModal from './CustomModal/ImageUploadModal';
import LoginModal from './CustomModal/LoginModal';
import SocialLinkModal from './CustomModal/SocialLinkModal';
import SupportModal from './CustomModal/SupportModal';

export const modalsKey = [
    'imageUploadModal',
    'loginModal',
    'socialLinkModal',
    'supportModal',
] as const;

export type ModalKey = typeof modalsKey[number];

type Modals = {
    [key in ModalKey]: React.ElementType;
};

export const modals: Modals = {
    imageUploadModal: ImageUploadModal,
    loginModal: LoginModal,
    socialLinkModal: SocialLinkModal,
    supportModal: SupportModal,
};
