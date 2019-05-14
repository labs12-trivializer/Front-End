import styled from 'styled-components';


export const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

export const RoundContainer = styled.div`
  width: 100%;
  margin-top: 4rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`;

export const RoundInfo = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  border: 1px solid #19B9E9;
  border-radius: .5rem;
  padding: 1rem .5rem;

  background-color: rgba(25, 185, 233, 0.25);

  > :first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background: rgba(255, 255, 255, .5);

    > p {
      font-size: 3.2rem;
      padding: 0;
      line-height: 0;
    }
  }
  > :last-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;

    > p {
      font-size: 1.1rem;
    }
  }
`;

export const SaveChanges = styled.button`
  /* bootstrap button ? */
  font-size: 1.2rem;
  border: 1px solid #19B9E9;
  border-radius: .5rem;
  background-color: rgba(25, 185, 233, 0.25);
  color: white;
  cursor: pointer;
  padding: .5rem;
  margin: 1rem 0;
  align-self: flex-end;
  /* width: 30%; */
  /* flex-grow: 1; */
`;

export const NoChanges = styled.button`
  /* bootstrap button ? */
  font-size: 1.2rem;
  border: 1px solid #19B9E9;
  border-radius: .5rem;
  background-color: rgba(25, 185, 233, 0.25);
  color: white;
  cursor: pointer;
  margin: 1rem 0;
  padding: .5rem;
  visibility: hidden;
`;

// export const GameList = styled.ul`
//   margin-top: 8rem;
//   display: flex;
//   flex-flow: row wrap;
//   justify-content: center;

//   > li {
//     color: #19B9E9;
//     background-color: rgba(25, 185, 233, 0.25);
//     border: 1px solid;
//     border-radius: 1rem;
//     width: 90%;
//     padding: 2rem 4rem;
//     border-radius: 1rem;
//     margin-bottom: 1rem;

//     > a {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       text-decoration: none;
//       color: #ebecf1;

//       > div {
//         text-align: right;
//       }
//     }
//   }

//   > a {
//     color: #25E1D2;
//     padding: 1rem;
//     border: 1px solid;
//     border-radius: 1rem;
//     width: 90%;
//     text-align: center;
//   }
// `;
