import React from 'react';
import styled from 'styled-components';

function Input(props) {
  return (
    <>
      <SubscriptionTiers>
        <CheckInput
          type="checkbox"
          name="silver"
          id="silver"
          onClick={props.toggleBasic}
        />
        <h6>1 Year Subscription - $9.99</h6>
      </SubscriptionTiers>
      <SubscriptionTiers>
        <CheckInput
          type="checkbox"
          name="gold"
          id="gold"
          onClick={props.togglePremium}
        />
        <h6>1 Year Premium Subscription - $29.99</h6>
      </SubscriptionTiers>
    </>
  );
}

export default Input;

const SubscriptionTiers = styled.form`
  display: flex;
  flex-flow: row nowrap;
  margin: 10px 5px;
`;

const CheckInput = styled.input`
  margin-right: 5px;
`;
