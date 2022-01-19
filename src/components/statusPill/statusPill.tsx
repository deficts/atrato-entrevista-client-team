import React from 'react'
import './statusPill.css'

const StatusPill = ({type, style}: {type: 'pendiente' | 'aprobado' | 'rechazado', style?: any}) => {

    const getTextFromType = () => {
        switch(type){
            case 'aprobado':
                return 'Aprobado';
            case 'rechazado':
                return 'Rechazado';
            case 'pendiente':
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
