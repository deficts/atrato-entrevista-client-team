import React, { useEffect, useState } from 'react';
import { Check, Circle } from 'react-feather';
import StatusPill from '../statusPill/statusPill';
import './clientCard.css';

const ClientCard = ({
  client,
  setModalOpen,
  setCurrentClient,
  setIsEditing,
  isSelecting,
  manageClientChecked
}: {
  client: Client;
  setModalOpen: any;
  setCurrentClient: any;
  setIsEditing: any;
  isSelecting: any;
  manageClientChecked: (checked: boolean, client: Client) => void
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelect = () => {
    setIsSelected(!isSelected, );
  }

  useEffect(() => {
    manageClientChecked(isSelected, client);
  }, [isSelected, client, manageClientChecked])

  return (
    <div className="wrapper">
      <div
        className="clientCard"
        onClick={() => {
          setCurrentClient(client);
          setIsEditing(false);
          setModalOpen(true);
        }}
        style={{
          width: isSelecting ? '80%' : '100%',
        }}
      >
        <div className="status-wrapper">
          <StatusPill type={client.status}></StatusPill>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <tr>
              <th>Id</th>
              <td>{client.id}</td>
            </tr>
            <tr>
              <th>Nombre</th>
              <td>{`${client.name} ${client.lastName}`}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td style={{ textOverflow: 'ellipsis' }}>{client.email}</td>
            </tr>
            <tr>
              <th>Teléfono</th>
              <td>{client.phone}</td>
            </tr>
          </table>
        </div>
      </div>
      {isSelecting ? (
        <div className="checkboxWrapper" onClick={toggleSelect}>
          {isSelected ?  <Check color='#3363ff'></Check> : <Circle color='grey'></Circle>}
        </div>
      ) : null}
    </div>
  );
};

export default ClientCard;
