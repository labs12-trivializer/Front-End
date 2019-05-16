import styled from 'styled-components';

export const Card = styled.div`
  color: white;
  background-color: rgba(25, 185, 233, 0.25);
  border: 1px solid;
  border-radius: 1rem;
  width: 90%;
  padding: 2rem 4rem;
  border-radius: 1rem;
  margin: 8rem auto;
  max-width: 700px;
  @media (max-width: 500px) {
    padding: 2rem 2rem;
  }
`;

export const ProgressDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`;

export const FormDiv = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: .5em;
  padding: .25em .5em;
  margin: 20px 0;
  width: 100%;
  max-width: 300px;
`;

export const SubscriptionTiers = styled.form`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 10px 5px;
`;

export const CheckInput = styled.input`
  margin-right: 5px;
`;

export const Header = styled.h2`
  text-align: center;
  color: white;
  text-transform: capitalize;
`;
