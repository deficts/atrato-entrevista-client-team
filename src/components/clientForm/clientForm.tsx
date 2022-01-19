import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import Button from '../button/button';
import './clientForm.css';

const emailRegexp =
  // eslint-disable-next-line
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/;
// eslint-disable-next-line
const expireDateRegexp = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;

const ClientForm = ({
  client,
  isEditing,
  setIsOpen,
  onSave,
}: {
  client?: Client | null;
  isEditing: boolean;
  setIsOpen: any;
  onSave: (client: Client) => void;
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data: any) => {
    onSave(data);
  };

  useEffect(() => {
    if (client && isEditing) {
      setValue('name', client.name);
      setValue('lastName', client.lastName);
      setValue('email', client.email);
      setValue('phone', client.phone);
      setValue('assignedAnalyst', client.assignedAnalyst);
      setValue('status', client.status);
      setValue('cardNumber', client.cardNumber);
      setValue('cvv', client.cvv);
      setValue('expireDate', client.expireDate);
      setValue('dateOfBirth', client.dateOfBirth);
    }
  }, [isEditing, client, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <input
            className="client-form-input"
            {...register('name', { required: true })}
            placeholder='Nombre'
          />
          {errors.name && (
            <span className="error">Favor de ingresar un nombre</span>
          )}

          <label>Apellido/s</label>
          <input
            className="client-form-input"
            {...register('lastName', { required: true })}
            placeholder='Apellido'
          />
          {errors.lastName && (
            <span className="error">Favor de ingresar un apellido</span>
          )}

          <label>Email</label>
          <input
            className="client-form-input"
            {...register('email', { required: true, pattern: emailRegexp })}
            placeholder='juan@ejemplo.com'
          />
          {errors.email && (
            <span className="error">Favor de ingresar un email válido</span>
          )}

          <label>Teléfono</label>
          <input
            className="client-form-input"
            type="tel"
            {...register('phone', { required: true, minLength: 10 })}
            placeholder='10 dígitos'
          />
          {errors.phone && (
            <span className="error">Favor de ingresar un teléfono válido</span>
          )}

          <label>Fecha de Nacimiento</label>
          <input
            type='date'
            className="client-form-input"
            {...register('dateOfBirth', {
              required: true,
            })}
          />
          {errors.expireDate && (
            <span className="error">
              Favor de ingresar una fecha de nacimiento válida
            </span>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: isMobile ? '' : '256px',
          }}
        >
          <label>Analísta Asignado</label>
          <select {...register('assignedAnalyst')}>
            <option value="Ted Mosby">Ted Mosby</option>
            <option value="Lily Aldrin">Lily Aldrin</option>
            <option value="Marshall Ericksen">Marshall Ericksen</option>
          </select>

          <label>Estatus</label>
          <select {...register('status')}>
            <option value="completado">Completado</option>
            <option value="pendiente">Pendiente</option>
            <option value="en proceso">En Proceso</option>
          </select>

          <label>Número de Tarjeta</label>
          <input
            className="client-form-input"
            type="tel"
            {...register('cardNumber', {
              required: true,
              minLength: 16,
              maxLength: 16,
            })}
            placeholder='Número de Tarjeta'
          />
          {errors.cardNumber && (
            <span className="error">
              Favor de ingresar un número de tarjeta válido
            </span>
          )}

          <label>CVV</label>
          <input
            className="client-form-input"
            type="tel"
            {...register('cvv', { required: true, minLength: 3, maxLength: 3 })}
          />
          {errors.cvv && (
            <span className="error">Favor de ingresar un cvv válido</span>
          )}

          <label>Fecha de expiración</label>
          <input
            className="client-form-input"
            {...register('expireDate', {
              required: true,
              pattern: expireDateRegexp,
            })}
            placeholder='MM/AA'
          />
          {errors.expireDate && (
            <span className="error">
              Favor de ingresar una fecha de expiración válida
            </span>
          )}
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
        <Button type="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </div>
    </form>
  );
};

export default ClientForm;
