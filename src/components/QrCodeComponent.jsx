import React from 'react';
import QRCode from 'react-qr-code';

const QrCodeComponent = () => {
  const url = "https://www.dhejomelshotel.co.ke/";

  return (
    <div className="qr-code-container">
      <h2 className="qr-code-heading">
        Scan to visit our hotel website:
      </h2>
      <div className="qr-code-wrapper">
        <QRCode
          value={url}
          size={180}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
        />
      </div>
    </div>
  );
};

export default QrCodeComponent;