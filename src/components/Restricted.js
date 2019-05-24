import React from 'react';

import { Container } from '../styles/restricted.css';

const Restricted = ({ auth }) => (
  <>
    <Container>
      <h4>You are not logged in!</h4>
      <p>
        Please <span onClick={auth.login}>log in</span> to continue.
      </p>
    </Container>
  </>
);

export default Restricted;
