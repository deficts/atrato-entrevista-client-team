import React from 'react';
import { useMediaQuery } from 'react-responsive';
import './creditCardInfo.css'

const CreditCardInfo = ({
  cvv,
  cardNumber,
  expireDate,
}: {
  cvv: string;
  cardNumber: string;
  expireDate: string;
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  
  return (
    <div className="credit-card-info-wrapper" style={{
      marginLeft: isMobile ? 0 : '64px',
      marginTop: isMobile ? '16px' : 0,
      width: '90%'
    }}>
      <label>Número de Tarjeta</label>
      <span className="info-text">{cardNumber}</span>

      <label>CVV</label>
      <span className="info-text">{cvv}</span>

      <label>Fecha de Expiración</label>
      <span className="info-text">
        {expireDate}
      </span>
    </div>
  );
};

export default CreditCardInfo;
