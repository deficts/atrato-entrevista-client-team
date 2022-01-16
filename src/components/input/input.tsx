import React from 'react'
import './input.css';

const Input = ({placeholder}: {placeholder: string}) => {
    return (
        <input type="text" placeholder={placeholder}/>
    )
}

export default Input;
