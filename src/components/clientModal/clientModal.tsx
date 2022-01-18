import React from 'react';
import './clientModal.css';
import Modal from 'react-modal';
import Button from '../button/button';
import { User, X } from 'react-feather';
import StatusPill from '../statusPill/statusPill';
import { useMediaQuery } from 'react-responsive';
import CreditCardInfo from '../creditCardInfo/creditCardInfo';

const ClientModal = ({
  client,
  isOpen,
  setIsOpen,
  isEditing,
}: {
  client?: Client | null;
  isOpen: boolean;
  setIsOpen: any;
  isEditing: boolean;
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <Modal
      isOpen={isOpen}
      appElement={document.getElementById('root') as HTMLElement}
      ariaHideApp={process.env.NODE_ENV !== 'test'}
      style={{
        content: {
          border: 'none',
          borderRadius: 10,
          width: isMobile ? '70%' : 'fit-content',
          height: 'fit-content',
          margin: '0 auto',
        },
        overlay: { background: 'rgb(0,0,0,.16)' },
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Button
          type="ghost"
          onClick={() => {
            setIsOpen(false);
          }}
          style={{ alignSelf: 'flex-end' }}
        >
          <X></X>
        </Button>
        {client ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <User style={{ marginRight: '16px' }}></User>
                <span
                  className={'title'}
                >{`${client.name} ${client.lastName}`}</span>
                <br />
                <label>ID {client.id}</label>
              </div>
              <StatusPill
                type={client.status}
                style={{ alignSelf: 'flex-start' }}
              ></StatusPill>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '16px'
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
                  {new Date(client.dateOfBirth).toLocaleDateString('es-MX')}
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
        ) : (
          <span>Aqui edito bro</span>
        )}
      </div>
    </Modal>
  );
};

export default ClientModal;
