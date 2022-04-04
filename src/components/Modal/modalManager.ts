import { lazy } from 'react';

const WidgetFactoryModal = lazy(
    () => import('./CustomModal/WidgetFactoryModal'),
);
const ImageUploadModal = lazy(() => import('./CustomModal/ImageUploadModal'));
const LoginModal = lazy(() => import('./CustomModal/LoginModal'));
const SocialLinkModal = lazy(() => import('./CustomModal/SocialLinkModal'));
const SupportModal = lazy(() => import('./CustomModal/SupportModal'));

export const modalsKey = [
    'imageUploadModal',
    'loginModal',
    'socialLinkModal',
    'supportModal',
    'widgetFactoryModal',
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
    widgetFactoryModal: WidgetFactoryModal,
};
