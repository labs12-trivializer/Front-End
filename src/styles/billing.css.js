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
`;

export const ProgressDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`;

export const FormDiv = styled.div`
  margin: 20px;
  background-color: white;
  box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
    rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
`;

export const SubscriptionTiers = styled.form`
  display: flex;
  flex-flow: row nowrap;
  margin: 10px 5px;
`;

export const CheckInput = styled.input`
  margin-right: 5px;
  disabled: true;
`;

export const Header = styled.h2`
  text-align: center;
  color: white;
  text-transform: capitalize;
`;
