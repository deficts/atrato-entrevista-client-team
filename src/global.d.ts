declare module 'react-responsive-cards-table';

declare type Client = {
  phone: string;
  email: string;
  name: string;
  lastName: string;
  dateOfBirth: string;
  status: 'aprobado' | 'pendiente' | 'rechazado';
  assignedAnalyst: string;
  id?: string;
  cvv: string;
  cardNumber: string;
  expireDate: string;
};
