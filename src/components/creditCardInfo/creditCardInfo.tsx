import React from 'react';
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
  return (
    <div className="credit-card-info-wrapper">
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
