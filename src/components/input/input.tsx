import React from 'react'
import './input.css';

const Input = ({value, placeholder, onChange, style}: {value: string, placeholder: string, onChange: any, style?: any}) => {
    return (
        <input style={style} type="text" placeholder={placeholder} onChange={(ev)=>{onChange(ev.target.value)}} value={value}/>
    )
}

export default Input;
