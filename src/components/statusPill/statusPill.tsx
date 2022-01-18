import React from 'react'
import './statusPill.css'

const StatusPill = ({type}: {type: 'pending' | 'declined' | 'approved'}) => {

    const getTextFromType = () => {
        switch(type){
            case 'approved':
                return 'Aprobado';
            case 'declined':
                return 'Rechazado';
            case 'pending':
                return 'Pendiente';
            default:
                return 'Pendiente';
        }
    }

    return (
        <div className={`pill ${type}`}>
            {getTextFromType()}
        </div>
    )
}

export default StatusPill;
