import React from 'react'
import './statusPill.css'

const StatusPill = ({type, style}: {type: 'pendiente' | 'completado' | 'en proceso', style?: any}) => {

    const getTextFromType = () => {
        switch(type){
            case 'completado':
                return 'Completado';
            case 'en proceso':
                return 'En Proceso';
            case 'pendiente':
                return 'Pendiente';
            default:
                return 'Pendiente';
        }
    }

    return (
        <div className={`pill ${type === 'en proceso' ? 'en-proceso' : type}`} style={style}>
            {getTextFromType()}
        </div>
    )
}

export default StatusPill;
