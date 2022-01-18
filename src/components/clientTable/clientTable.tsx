import React, { useEffect, useMemo, useState } from 'react';
import { Edit, Trash } from 'react-feather';
import toast from 'react-hot-toast';
import { useMediaQuery } from 'react-responsive';
import { ResponsiveCardTable, Content } from 'react-responsive-cards-table';
import api from '../../api/api';
import Button from '../button/button';
import ClientCard from '../clientCard/clientCard';
import ClientModal from '../clientModal/clientModal';
import ConfirmDeleteModal from '../confirmDeleteModal/confirmDeleteModal';
import Input from '../input/input';
import Spinner from '../spinner/spinner';
import StatusPill from '../statusPill/statusPill';
import './clientTable.css';

const ClientTable = () => {
  const [isLoading, setisLoading] = useState(false);
  const [clients, setClients] = useState<Array<Client>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [currentClientsToDelete, setCurrentClientsToDelete] = useState<Array<Client>>([]);
  const [selectedClients, setSelectedClients] = useState<Array<Client>>([]);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    performGetClients();
    setCurrentClientsToDelete([]);
  }, []);

  const renderCards = useMemo(() => {
    return clients.map((client: Client) => {
      return (
        <ClientCard client={client} setModalOpen={setIsModalOpen}></ClientCard>
      );
    });
  }, [clients]);

  const manageClientChecked = (checked: boolean, client: Client) => {
    if(checked) {
      setSelectedClients(selectedClients => [...selectedClients, client]);
    } else {
      const copy = [...selectedClients];
      const index = selectedClients.findIndex((el)=>(el.id === client.id));
      copy.splice(index,1);
      setSelectedClients(copy);
    }
  }

  const renderRows = useMemo(() => {
    return clients.map((client: Client, index: number) => {
      return (
        <tr key={client.id} className="table-border">
          <td>
            <input type="checkbox" style={{ marginRight: '16px' }} onChange={(ev)=>{manageClientChecked(ev.target.checked, client)}}/>
          </td>
          <td>{client.id}</td>
          <td>{`${client.name} ${client.lastName}`}</td>
          <td>{client.email}</td>
          <td>{client.phone}</td>
          <td>
            <StatusPill type={client.status}></StatusPill>
          </td>
          <td style={{ textAlign: 'center' }}>
            <Button
              type="danger"
              onClick={() => {
                setIsDeleteModalOpen(true);
                setCurrentClientsToDelete([client]);
              }}
            >
              <Trash style={{ width: '16px', height: '16px' }}></Trash>
            </Button>
            <Button type="ghost" onClick={()=>{toast('hola!')}}>
              <Edit style={{ width: '16px', height: '16px' }}></Edit>
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setCurrentClient(client);
                setIsModalOpen(true);
              }}
            >
              Ver
            </Button>
          </td>
        </tr>
      );
    });
  }, [clients]);

  const performGetClients = async () => {
    setisLoading(true);
    const res = await api.get('clients');
    setClients(res.data);
    setisLoading(false);
  };

  const removeClients = () => {
    const newClients = clients.filter(el =>
      !currentClientsToDelete.find(del => del.id === el.id)
    )
    setClients(newClients);
  }

  return isLoading ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner></Spinner>
    </div>
  ) : (
    <>
      <ClientModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        isEditing={false}
        client={currentClient}
      ></ClientModal>
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        clients={currentClientsToDelete}
        removeClients={removeClients}
      ></ConfirmDeleteModal>
      <div className="container">
        <div className="header">
          <div className="title-wrapper">
            <span className="title">Clientes</span>
            <Input placeholder="Buscar Clientes" />
          </div>
          {!isMobile ? (
            <div style={{ width: 'fit-content' }}>
              <Button
                type="danger"
                onClick={() => {
                  setIsDeleteModalOpen(true);
                  setCurrentClientsToDelete(selectedClients);
                }}
                disabled = {selectedClients.length < 1}
              >
                <Trash style={{ width: '16px', height: '16px' }}></Trash>
              </Button>
              <Button type="primary">Agregar Cliente</Button>
            </div>
          ) : null}
        </div>
        <ResponsiveCardTable>
          {({ isCard }: { isCard: boolean }) => {
            if (isCard) {
              return <Content>{renderCards}</Content>;
            }

            return (
              <Content>
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Teléfono</th>
                      <th>Estatus</th>
                      <th style={{ textAlign: 'center' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>{renderRows}</tbody>
                </table>
              </Content>
            );
          }}
        </ResponsiveCardTable>
      </div>
    </>
  );
};

export default ClientTable;
