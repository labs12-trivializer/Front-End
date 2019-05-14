import React from 'react';
import styled from 'styled-components';

function Input(props) {
  if (props.tier === 'bronze') {
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
  } else if (props.tier === 'silver') {
    return (
      <SubscriptionTiers>
        <CheckInput
          type="checkbox"
          name="gold"
          id="gold"
          onClick={props.togglePremium}
        />
        <h6>1 Year Premium Subscription - $29.99</h6>
      </SubscriptionTiers>
    );
  } else {
    return <h1>You are already a member of the highest tier</h1>;
  }
}

export default Input;

const SubscriptionTiers = styled.form`
  display: flex;
  flex-flow: row nowrap;
  margin: 10px 5px;
`;

const CheckInput = styled.input`
  margin-right: 5px;
  disabled: true;
`;
