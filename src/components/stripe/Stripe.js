import React from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements, StripeProvider } from 'react-stripe-elements';
import waitForProfile from '../waitForProfile';
import { Card, Typography } from '@material-ui/core';
import TierDetails from './TierDetails';

const Stripe = () => {
  return (
    <>
      <Typography variant="h4">Billing</Typography>
      <TierDetails />
      <Card>
        <StripeProvider apiKey="pk_test_rLIPiZV9cJfPy9p4WZgEMCbA00qbhu5zTZ">
          <Elements>
            <CheckoutForm />
          </Elements>
        </StripeProvider>
      </Card>
    </>
  );
};

export default waitForProfile(Stripe);
