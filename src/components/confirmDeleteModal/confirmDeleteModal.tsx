import React from 'react';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import api from '../../api/api';
import Button from '../button/button';
import './confirmDeleteModal.css';

const ConfirmDeleteModal = ({
  clients,
  isOpen,
  setIsOpen,
  removeClients
}: {
  clients: Client[];
  isOpen: boolean;
  setIsOpen: any;
  removeClients: any;
}) => {
  const onConfirm = async () => {
    setIsOpen(false);
    toast.promise(deleteClients(), {
      loading: 'Eliminando clientes...',
      success: <b>Clientes eliminados</b>,
      error: <b>Ocurrió un error al eliminar los clientes</b>,
    });
  };

  const deleteClients = async () => {
      try {
        for (let client of clients) {
            await api.delete(`clients/${client.id}`);
        }
        removeClients()
      } catch (error) {
        console.log(error);
        throw error;   
      }
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
          height: 'fit-content',
          margin: '0 auto',
          width: 'fit-content',
        },
        overlay: { background: 'rgb(0,0,0,.16)' },
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span className="delete-title">{`¿Estas seguro que desear eliminar a${
          clients.length > 1 ? ' los clientes' : 'l cliente'
        }?`}</span>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            type="ghost"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancelar
          </Button>
          <Button type="danger" onClick={onConfirm}>
            Eliminar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
