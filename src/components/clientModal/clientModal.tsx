import React from 'react';
import './clientModal.css';
import Modal from 'react-modal';
import Button from '../button/button';
import { X } from 'react-feather';
import { useMediaQuery } from 'react-responsive';
import api from '../../api/api';
import toast from 'react-hot-toast';
import ClientData from '../clientData/clientData';
import ClientForm from '../clientForm/clientForm';

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

  const onSave = (payload: Client) => {
    if (isEditing && payload && client) {
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
          height: (isMobile && (!client || isEditing)) ? '' : 'fit-content',
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
          <ClientData client={client}></ClientData>
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
            <ClientForm setIsOpen={setIsOpen} onSave={onSave} isEditing={isEditing} client={client}></ClientForm>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ClientModal;
