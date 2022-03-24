import CryptoJS from 'crypto-js';

export const encrypt = (value: string | object) => {
    value = JSON.stringify(value);

    const encrypted = CryptoJS.AES.encrypt(
        value,
        import.meta.env.VITE_CRYPTO_KEY + '',
    ).toString();

    return encrypted;
};

export const decrypt = (encrypted: string) => {
    if (!encrypted) return;

    const bytes = CryptoJS.AES.decrypt(
        encrypted,
        import.meta.env.VITE_CRYPTO_KEY + '',
    );
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    const original = JSON.parse(decrypted);
    return original;
};
