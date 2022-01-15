import React, { ReactNode } from 'react'
import './button.css'

function Button({children, type}: {children: ReactNode, type: 'primary' | 'ghost' | 'danger'}) {

    const getClassName = (type: 'primary' | 'ghost' | 'danger') => {
        switch(type){
            case 'primary':
                return 'button-primary';
            case 'ghost':
                return 'button-ghost';
            case 'danger':
                return 'button-danger';
            default:
                return 'button-primary';
        }
    }

    return (
        <button className={getClassName(type)}>
            {children}
        </button>
    )
}

export default Button
