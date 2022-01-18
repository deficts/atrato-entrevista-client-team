import React from 'react'
import './statusPill.css'

const StatusPill = ({type, style}: {type: 'pending' | 'declined' | 'approved', style?: any}) => {

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
        <div className={`pill ${type}`} style={style}>
            {getTextFromType()}
        </div>
    )
}

export default StatusPill;
