import React from 'react';
import Spinner from 'react-spinkit';

import { Center } from '../styles/callback.css';
import { Background } from '../styles/shared.css';

const Callback = () => {
  return (
    <>
      <Center>
        <Spinner name="ball-scale-ripple" color="#25E1D2" />
      </Center>
    </>
  );
};

export default Callback;
