import React, { useEffect, useMemo, useState } from 'react';
import { Edit, Trash } from 'react-feather';
import { ResponsiveCardTable, Content } from 'react-responsive-cards-table';
import api from '../../api/api';
import Button from '../button/button';
import Input from '../input/input';
import Spinner from '../spinner/spinner';
import StatusPill from '../statusPill/statusPill';
import './clientTable.css';

const ClientTable = () => {
  const [isLoading, setisLoading] = useState(false);
  const [clients, setClients] = useState<Array<Client>>([]);

  useEffect(() => {
    performGetClients();
  }, []);

  const renderRows = useMemo(() => {
    return clients.map((client: Client) => {
      return (
        <tr key={client.id}>
          <td>
            <input type="checkbox" />
          </td>
          <td>{client.id}</td>
          <td>{`${client.name} ${client.lastName}`}</td>
          <td>{client.email}</td>
          <td>{client.phone}</td>
          <td>
            {' '}
            <StatusPill type={client.status}></StatusPill>
          </td>
          <td style={{textAlign: 'center'}}>
            <Button type="danger">
              <Trash style={{ width: '16px', height: '16px' }}></Trash>
            </Button>
            <Button type="ghost">
              <Edit style={{ width: '16px', height: '16px' }}></Edit>
            </Button>
            <Button type="primary">Ver</Button>
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

  return isLoading ? (
    <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinner></Spinner>
    </div>
  ) : (
    <div className="container">
      <div className="header">
        <div style={{width: 'fit-content', display: 'flex', alignItems: 'flex-end'}}>
          <span className='title'>Clientes</span>
          <Input placeholder='Buscar Clientes'/>
        </div>
        <div style={{width: 'fit-content'}}>
          <Button type="danger">
            <Trash style={{ width: '16px', height: '16px' }}></Trash>
          </Button>
          <Button type="primary">Agregar Cliente</Button>
        </div>
      </div>
      <ResponsiveCardTable>
        {({ isCard }: { isCard: boolean }) => {
          if (isCard) {
            return <Content>Hola Mobile</Content>;
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
                    <th style={{textAlign: 'center'}}>Acciones</th>
                  </tr>
                </thead>
                <tbody>{renderRows}</tbody>
              </table>
            </Content>
          );
        }}
      </ResponsiveCardTable>
    </div>
  );
};

export default ClientTable;
