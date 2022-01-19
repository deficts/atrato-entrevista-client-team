import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Edit, Plus, Trash } from 'react-feather';
import toast from 'react-hot-toast';
import { useMediaQuery } from 'react-responsive';
import { ResponsiveCardTable, Content } from 'react-responsive-cards-table';
import api from '../../api/api';
import { useDebounce } from '../../hooks/useDebounce';
import Button from '../button/button';
import ClientCard from '../clientCard/clientCard';
import ClientModal from '../clientModal/clientModal';
import ConfirmDeleteModal from '../confirmDeleteModal/confirmDeleteModal';
import Spinner from '../spinner/spinner';
import StatusPill from '../statusPill/statusPill';
import './clientTable.css';

const ClientTable = () => {
  const [isLoading, setisLoading] = useState(false);
  const [clients, setClients] = useState<Array<Client>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [currentClientsToDelete, setCurrentClientsToDelete] = useState<
    Array<Client>
  >([]);
  const [selectedClients, setSelectedClients] = useState<Array<Client>>([]);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [debouncedSearch, search, setSearch] = useDebounce('');
  const [filter, setFilter] = useState<'id' | 'status' | 'name'>('id');
  const [filterDirection, setFilterDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    performGetClients();
    setCurrentClientsToDelete([]);
  }, []);

  useEffect(() => {
    setSelectedClients([]);
  }, [isSelecting])

  const setNewFilter = (newFilter: 'id' | 'status' | 'name') => {
    if (newFilter !== filter) {
      setFilter(newFilter);
    } else {
      setFilterDirection(filterDirection === 'asc' ? 'desc' : 'asc');
    }
  };

  const filteredClients = useMemo(() => {
    return clients
      .filter(
        (client) =>
          `${client.name} ${client.lastName}`.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          client.id?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          client.status.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
      .sort((a, b) => {
        if (filter === 'id') {
          if (filterDirection === 'asc') {
            return Number(a.id) < Number(b.id) ? 1 : -1;
          } else {
            return Number(a.id) > Number(b.id) ? 1 : -1;
          }
        } else {
          if (filterDirection === 'asc') {
            return (a[filter] ?? '') < (b[filter] ?? '') ? 1 : -1;
          } else {
            return (a[filter] ?? '') > (b[filter] ?? '') ? 1 : -1;
          }
        }
      });
  }, [debouncedSearch, clients, filter, filterDirection]);

  const manageClientChecked = useCallback(
    (checked: boolean, client: Client) => {
      if (checked) {
        setSelectedClients((selectedClients) => [...selectedClients, client]);
      } else {
        const newSelectedClients = selectedClients.filter((el) => {
          return client.id !== el.id;
        });
        setSelectedClients(newSelectedClients);
      }
    },
    [selectedClients]
  );

  const onSelectCard = useCallback(
    (client: Client, checked: boolean) => {
      manageClientChecked(checked, client);
    },
    [manageClientChecked]
  );

  const renderCards = useMemo(() => {
    return filteredClients.map((client: Client) => {
      return (
        <ClientCard
          client={client}
          setModalOpen={setIsModalOpen}
          setCurrentClient={setCurrentClient}
          setIsEditing={setIsEditing}
          isSelecting={isSelecting}
          onSelect={onSelectCard}
        ></ClientCard>
      );
    });
  }, [filteredClients, isSelecting, onSelectCard]);

  const addNewClient = (client: Client) => {
    const copy = [...clients, client];
    setClients(copy);
    setCurrentClient(null);
  };

  const updateClient = (client: Client) => {
    const copy = [...clients];
    const index = copy.findIndex((el) => el.id === client.id);
    copy[index] = client;
    setClients(copy);
  };

  const renderRows = useMemo(() => {
    return filteredClients.map((client: Client, index: number) => {
      return (
        <tr key={client.id} className="table-border">
          <td>
            <input
              type="checkbox"
              style={{ marginRight: '16px' }}
              onChange={(ev) => {
                manageClientChecked(ev.target.checked, client);
              }}
            />
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
            <Button
              type="ghost"
              onClick={() => {
                setCurrentClient(client);
                setIsModalOpen(true);
                setIsEditing(true);
              }}
            >
              <Edit style={{ width: '16px', height: '16px' }}></Edit>
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setCurrentClient(client);
                setIsEditing(false);
                setIsModalOpen(true);
              }}
            >
              Ver
            </Button>
          </td>
        </tr>
      );
    });
  }, [filteredClients, manageClientChecked]);

  const performGetClients = async () => {
    setisLoading(true);
    try {
      const res = await api.get('clients');
      setClients(res.data);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      toast.error('Ocurrió un error al cargar los clientes');
    }
  };

  const removeClients = () => {
    const newClients = clients.filter(
      (el) => !currentClientsToDelete.find((del) => del.id === el.id)
    );
    setClients(newClients);
    setIsSelecting(false);
  };

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
        isEditing={isEditing}
        client={currentClient}
        updateClient={updateClient}
        addNewClient={addNewClient}
        setIsEditing={setIsEditing}
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
            {isMobile ? null : (
              <input
                placeholder="Buscar..."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              ></input>
            )}
          </div>
          {!isMobile ? (
            <div style={{ width: 'fit-content' }}>
              <Button
                type="danger"
                onClick={() => {
                  setIsDeleteModalOpen(true);
                  setCurrentClientsToDelete(selectedClients);
                }}
                disabled={selectedClients.length < 1}
              >
                <Trash style={{ width: '16px', height: '16px' }}></Trash>
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setCurrentClient(null);
                  setIsEditing(false);
                  setIsModalOpen(true);
                }}
              >
                Agregar Cliente
              </Button>
            </div>
          ) : (
            <div>
              <Button
                type="secondary"
                style={{ marginTop: '6px' }}
                onClick={() => {
                  setIsSelecting(!isSelecting);
                }}
              >
                {isSelecting ? 'Listo' : 'Seleccionar'}
              </Button>
              <div className="fab-container">
                <Button
                  type="danger"
                  onClick={() => {
                    setIsDeleteModalOpen(true);
                    setCurrentClientsToDelete(selectedClients);
                  }}
                  disabled={selectedClients.length < 1}
                >
                  <Trash></Trash>
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    setCurrentClient(null);
                    setIsEditing(false);
                    setIsModalOpen(true);
                  }}
                >
                  <Plus></Plus>
                </Button>
              </div>
            </div>
          )}
        </div>
        {isMobile ? (
          <input
            placeholder="Buscar..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            style={{ marginBottom: '16px' }}
          ></input>
        ) : null}
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
                      <th
                        onClick={() => {
                          setNewFilter('id');
                        }}
                        className="pointer"
                      >
                        ID
                        {filter === 'id' ? (
                          filterDirection === 'asc' ? (
                            <ChevronUp width={16} height={16}></ChevronUp>
                          ) : (
                            <ChevronDown width={16} height={16}></ChevronDown>
                          )
                        ) : null}
                      </th>
                      <th
                        onClick={() => {
                          setNewFilter('name');
                        }}
                        className="pointer"
                      >
                        Nombre
                        {filter === 'name' ? (
                          filterDirection === 'asc' ? (
                            <ChevronUp width={16} height={16}></ChevronUp>
                          ) : (
                            <ChevronDown width={16} height={16}></ChevronDown>
                          )
                        ) : null}
                      </th>
                      <th>Email</th>
                      <th>Teléfono</th>
                      <th
                        onClick={() => {
                          setNewFilter('status');
                        }}
                        className="pointer"
                      >
                        Estatus
                        {filter === 'status' ? (
                          filterDirection === 'asc' ? (
                            <ChevronUp width={16} height={16}></ChevronUp>
                          ) : (
                            <ChevronDown width={16} height={16}></ChevronDown>
                          )
                        ) : null}
                      </th>
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
