import React, { useEffect, useState } from 'react';
import './clientModal.css';
import Modal from 'react-modal';
import Button from '../button/button';
import { User, X } from 'react-feather';
import StatusPill from '../statusPill/statusPill';
import { useMediaQuery } from 'react-responsive';
import CreditCardInfo from '../creditCardInfo/creditCardInfo';
import Input from '../input/input';
import api from '../../api/api';
import toast from 'react-hot-toast';

const ClientModal = ({
  client,
  isOpen,
  setIsOpen,
  setIsEditing,
  isEditing,
  addNewClient,
  updateClient,
}: {
  client?: Client | null;
  isOpen: boolean;
  setIsOpen: any;
  setIsEditing: any;
  isEditing: boolean;
  addNewClient: (client: Client) => void;
  updateClient: (client: Client) => void;
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [assignedAnalyst, setAssignedAnalyst] = useState('');
  const [status, setStatus] = useState<'approved' | 'pending' | 'declined'>(
    'pending'
  );
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [dateOfBirth, setdateOfBirth] = useState('');

  useEffect(() => {
    if (client && isEditing) {
      setFirstName(client.name);
      setLastName(client.lastName);
      setEmail(client.email);
      setPhone(client.phone);
      setAssignedAnalyst(client.assignedAnalyst);
      setStatus(client.status);
      setCardNumber(client.cardNumber);
      setExpireDate(client.expireDate);
      setdateOfBirth(client.dateOfBirth);
      setCvv(client.cvv);
    } else {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setAssignedAnalyst('');
      setStatus('pending');
      setCardNumber('');
      setExpireDate('');
      setdateOfBirth('');
      setCvv('');
    }
  }, [client, isEditing]);

  const onSave = () => {
    const payload: Client = {
      phone,
      email,
      name: firstName,
      lastName,
      cardNumber,
      cvv,
      expireDate,
      assignedAnalyst,
      status,
      dateOfBirth,
    };
    if (isEditing && client) {
      toast.promise(saveEditedClient(payload, client.id ?? ''), {
        loading: 'Guardando cliente...',
        success: <b>Cliente guardado con éxito</b>,
        error: <b>Ocurrió un error al guardar el cliente</b>,
      });
    } else {
      toast.promise(saveNewClient(payload), {
        loading: 'Guardando cliente...',
        success: <b>Cliente guardado con éxito</b>,
        error: <b>Ocurrió un error al guardar el cliente</b>,
      });
    }
    setIsOpen(false);
  };

  const saveEditedClient = async (payload: Client, id: string) => {
    const res = await api.put(`clients/${id}`, payload);
    updateClient(res.data);
  };

  const saveNewClient = async (payload: Client) => {
    const res = await api.post('clients', payload);
    addNewClient(res.data);
  };

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
          height: isMobile ? '' : 'fit-content',
          margin: '0 auto',
        },
        overlay: { background: 'rgb(0,0,0,.16)' },
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginBottom: '16px',
          }}
        >
          {!isEditing && client ? (
            <Button
              type="secondary"
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            >
              Editar
            </Button>
          ) : null}
          <Button
            type="ghost"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <X></X>
          </Button>
        </div>
        {client && !isEditing ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                  className={'title'}
                >{`${client.name} ${client.lastName}`}</span>
                <br />
                <label>ID {client.id}</label>
              </div>
              {isMobile ? null : (
                <StatusPill
                  type={client.status}
                  style={{ alignSelf: 'flex-start' }}
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span className={'title'}>Cliente</span>
              </div>
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
                  width: isMobile ? '' : '256px',
                  marginRight: isMobile ? '' : '64px',
                }}
              >
                <label>Nombre/s</label>
                <Input
                  value={firstName}
                  placeholder="Ted"
                  onChange={setFirstName}
                  style={{ marginTop: '16px' }}
                ></Input>

                <label>Apellido/s</label>
                <Input
                  value={lastName}
                  placeholder="Mosby"
                  onChange={setLastName}
                  style={{ marginTop: '16px' }}
                ></Input>

                <label>Email</label>
                <Input
                  value={email}
                  placeholder="ted@ejemplo.com"
                  onChange={setEmail}
                  style={{ marginTop: '16px' }}
                ></Input>

                <label>Teléfono</label>
                <Input
                  value={phone}
                  placeholder="3221930316"
                  onChange={setPhone}
                  style={{ marginTop: '16px' }}
                ></Input>

                <label>Fecha de Nacimiento</label>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: isMobile ? '' : '256px',
                }}
              >
                <label>Analísta Asignado</label>
                <select
                  value={assignedAnalyst}
                  onChange={(ev) => {
                    setAssignedAnalyst(ev.target.value);
                  }}
                >
                  <option value="Ted Mosby">Ted Mosby</option>
                  <option value="Lily Aldrin">Lily Aldrin</option>
                  <option value="Marshall Ericksen">Marshall Ericksen</option>
                </select>

                <label>Estatus</label>
                <select
                  value={status}
                  onChange={(ev) => {
                    setStatus(
                      ev.target.value as 'approved' | 'pending' | 'declined'
                    );
                  }}
                >
                  <option value="approved">Aprobado</option>
                  <option value="pending">Pendiente</option>
                  <option value="declined">Rechazado</option>
                </select>

                <label>Número de Tarjeta</label>
                <Input
                  value={cardNumber}
                  placeholder="***************"
                  onChange={setCardNumber}
                  style={{ marginTop: '16px' }}
                ></Input>

                <label>CVV</label>
                <Input
                  value={cvv}
                  placeholder="***"
                  onChange={setCvv}
                  style={{ marginTop: '16px' }}
                ></Input>

                <label>Fecha de expiración</label>
                <Input
                  value={expireDate}
                  placeholder="05/25"
                  onChange={setExpireDate}
                  style={{ marginTop: '16px' }}
                ></Input>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: '16px',
              }}
            >
              <Button
                type="ghost"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Cerrar
              </Button>
              <Button type="primary" onClick={onSave}>
                Guardar
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ClientModal;
