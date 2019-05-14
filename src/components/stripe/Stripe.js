import React from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements, StripeProvider } from 'react-stripe-elements';
import waitForProfile from '../waitForProfile';

const Stripe = () => {
  return (
    <div>
      <StripeProvider apiKey="pk_test_rLIPiZV9cJfPy9p4WZgEMCbA00qbhu5zTZ">
        <Elements>
          <CheckoutForm />
        </Elements>
      </StripeProvider>
    </div>
  );
};

export default waitForProfile(Stripe);
