import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutForm from './CheckoutForm';
import { Elements, StripeProvider } from 'react-stripe-elements';
import waitForProfile from '../waitForProfile';
import { Card } from '@material-ui/core';
import Pricing from './Pricing';
import { Header } from '../../styles/billing.css';

class Stripe extends Component {
  state = {
    showStripe: false
  };

  render() {
    return (
      <>
        <Pricing tier={this.props.profile.tier_name} />
        <Header>Current Tier: {this.props.profile.tier_name}</Header>
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

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  null
)(waitForProfile(Stripe));

// export default waitForProfile(Stripe);
