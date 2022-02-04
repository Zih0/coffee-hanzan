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
      value={`${process.env.REACT_APP_A}${bank}${process.env.REACT_APP_B}${account}${process.env.REACT_APP_C}${amount}`}
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
