import React from 'react';
import { SubscriptionTiers, CheckInput } from '../../styles/billing.css';

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
          <h6>Upgrade to Silver for $9.99 per year</h6>
        </SubscriptionTiers>
        <SubscriptionTiers>
          <CheckInput
            type="checkbox"
            name="gold"
            id="gold"
            onClick={props.togglePremium}
          />
          <h6>Upgrade to Gold for $29.99 per year</h6>
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
        <h6>Upgrade to Gold for $29.99 per year</h6>
      </SubscriptionTiers>
    );
  } else {
    return <div />;
  }
}

export default Input;
