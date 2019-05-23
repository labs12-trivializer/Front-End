import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;

    > #root {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
  }
`;
