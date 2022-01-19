import React from 'react';
import { User } from 'react-feather';
import { useMediaQuery } from 'react-responsive';
import CreditCardInfo from '../creditCardInfo/creditCardInfo';
import StatusPill from '../statusPill/statusPill';
import './clientData.css';

const ClientData = ({ client }: { client: Client }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {isMobile ? (
        <StatusPill
          type={client.status}
          style={{ alignSelf: 'flex-end', marginBottom: '16px' }}
        ></StatusPill>
      ) : null}
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <User style={{ marginRight: '16px' }}></User>
          <span
            className={isMobile ? 'title-mobile' : 'title'}
          >{`${client.name} ${client.lastName}`}</span>
          <br />
          <label>ID {client.id}</label>
        </div>
        {isMobile ? null : (
          <StatusPill
            type={client.status}
            style={{ alignSelf: 'center' }}
          ></StatusPill>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          marginTop: '16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <label>Email</label>
          <span className="info-text">{client.email}</span>

          <label>Teléfono</label>
          <span className="info-text">{client.phone}</span>

          <label>Fecha de Nacimiento</label>
          <span className="info-text">
            {client.dateOfBirth}
          </span>

          <label>Analísta Asignado</label>
          <span className="info-text">{client.assignedAnalyst}</span>
        </div>

        <CreditCardInfo
          cvv={client.cvv}
          cardNumber={client.cardNumber}
          expireDate={client.expireDate}
        />
      </div>
    </div>
  );
};

export default ClientData;
