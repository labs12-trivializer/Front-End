import React, { Component } from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements, StripeProvider } from 'react-stripe-elements';
import waitForProfile from '../waitForProfile';
import { Card } from '@material-ui/core';
import Pricing from './Pricing';

class Stripe extends Component {
  state = {};

  render() {
    return (
      <>
        <Pricing />
        <Card>
          <StripeProvider apiKey="pk_test_rLIPiZV9cJfPy9p4WZgEMCbA00qbhu5zTZ">
            <Elements>
              <CheckoutForm />
            </Elements>
          </StripeProvider>
        </Card>
      </>
    );
  }
}

export default waitForProfile(Stripe);
