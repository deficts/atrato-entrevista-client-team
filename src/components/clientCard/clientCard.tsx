import React from 'react';
import StatusPill from '../statusPill/statusPill';
import './clientCard.css';

const ClientCard = ({ client, setModalOpen }: { client: Client, setModalOpen: any}) => {
  return (
    <div className="clientCard" onClick={()=>{setModalOpen(true)}}>
      <div className="status-wrapper">
        <StatusPill type={client.status}></StatusPill>
      </div>
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
          <td>{client.email}</td>
        </tr>
        <tr>
          <th>Teléfono</th>
          <td>{client.phone}</td>
        </tr>
      </table>
    </div>
  );
};

export default ClientCard;
