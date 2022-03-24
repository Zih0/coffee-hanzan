import QRCode from 'qrcode.react';

import { IconLogoCenter } from '../../../assets/icons';
import { decrypt } from '../../../utils/crypto';

interface IQR {
    bank: string;
    account: string;
    amount: number;
}

function QR({ bank, account, amount }: IQR) {
    const decryptedBank = decrypt(bank);
    const decryptedAccount = decrypt(account);

    return (
        <QRCode
            value={`${import.meta.env.VITE_A}${decryptedBank}${
                import.meta.env.VITE_B
            }${decryptedAccount}${import.meta.env.VITE_C}${amount}`}
            size={128}
            bgColor={'#ffffff'}
            fgColor={'#000000'}
            level={'L'}
            includeMargin={false}
            renderAs={'svg'}
            imageSettings={{
                src: IconLogoCenter,
                height: 24,
                width: 24,
                excavate: true,
            }}
        />
    );
}

export default QR;
