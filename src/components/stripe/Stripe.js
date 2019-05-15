import React from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements, StripeProvider } from 'react-stripe-elements';
import waitForProfile from '../waitForProfile';
import { Background } from '../../styles/shared.css.js';
import { Card } from '../../styles/billing.css.js';

const Stripe = () => {
  return (
    <>
      <Background />
      <Card>
        <StripeProvider apiKey="pk_test_rLIPiZV9cJfPy9p4WZgEMCbA00qbhu5zTZ">
          <Elements>
            <CheckoutForm />
          </Elements>
        </StripeProvider>
      </Card>
      <Background />
    </>
  );
};

export default waitForProfile(Stripe);
