import React, { ReactNode } from 'react';
import './button.css';

const Button = ({
  children,
  type,
  onClick,
  style,
  disabled
}: {
  children: ReactNode;
  type: 'primary' | 'ghost' | 'danger';
  onClick?: any;
  style?: any;
  disabled?: boolean
}) => {
  const getClassName = (type: 'primary' | 'ghost' | 'danger') => {
    switch (type) {
      case 'primary':
        return 'button-primary';
      case 'ghost':
        return 'button-ghost';
      case 'danger':
        return 'button-danger';
      default:
        return 'button-primary';
    }
  };

  return (
    <button
      className={getClassName(type)}
      onClick={() => {
        onClick();
      }}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
