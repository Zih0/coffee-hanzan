import QRCode from "qrcode.react";
import { IconLogoCenter } from "../../assets/icons";

interface IQR {
  bank: string;
  account: string;
  amount: number;
}

function QR({ bank, account, amount }: IQR) {
  return (
    <QRCode
      value={`${import.meta.env.VITE_A}${bank}${
        import.meta.env.VITE_B
      }${account}${import.meta.env.VITE_C}${amount}`}
      size={128}
      bgColor={"#ffffff"}
      fgColor={"#000000"}
      level={"L"}
      includeMargin={false}
      renderAs={"svg"}
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
