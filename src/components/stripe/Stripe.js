import React from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements, StripeProvider } from 'react-stripe-elements';
import waitForProfile from '../waitForProfile';
import { Background } from '../../styles/shared.css';

const Stripe = () => {
  return (
    <>
      <Background />
      <StripeProvider apiKey="pk_test_rLIPiZV9cJfPy9p4WZgEMCbA00qbhu5zTZ">
        <Elements>
          <CheckoutForm />
        </Elements>
      </StripeProvider>
      <Background />
    </>
  );
};

export default waitForProfile(Stripe);
