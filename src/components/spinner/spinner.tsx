import React from 'react';
import { Loader } from 'react-feather';
import './spinner.css'

const Spinner = () => {
  return (
      <Loader className='loading'></Loader>
  );
};

export default Spinner;
