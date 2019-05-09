import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import CheckBox from './CheckBox';
// import axios from 'axios';
import waitForProfile from '../waitForProfile';
import serverHandshake from '../../auth/serverHandshake';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
      basicPlan: false,
      premiumPlan: false
    };
  }
  toggleBasicPlan = e => {
    this.setState({ basicPlan: !this.state.basicPlan });
  };
  togglePremiumPlan = e => {
    this.setState({ premiumPlan: !this.state.premiumPlan });
  };
  //User hits submit after entering credit card info:
  async submit(e) {
    const gold = 'plan_Eyw9DUPvzcFMvK';
    const silver = 'plan_Eyw8BcuV5qyAV2';
    let plan = null;
    if (this.state.premiumPlan && !this.state.basicPlan) {
      plan = gold;
    } else if (this.state.basicPlan && !this.state.premiumPlan) {
      plan = silver;
    } else {
      return;
    }
    // request to stripe API to tokenize credit card information, responds with token
    //for compliance purposes we do not handle or store the customers credit card info, we use the tokenized version returned by Stripe
    let { token } = await this.props.stripe.createToken({ name: 'Name' });
    console.log(token.id);

    //create a new customer account associated with our app on Stripe
    //this uses our backend API to communicate with Stripe
    const customer = await serverHandshake(true).post('/billing/customer', {
      name: 'hardcoded testname',
      source: token.id //using the token returned above as their payment source
    });
    console.log('customer', customer);

    //Using backend api, Subscribe customer to one of our two paid plans (silver or gold)

    const subscribe = await serverHandshake(true).post('/billing/subscribe', {
      customer: customer.data.id, //using customer id returned above.
      plan //gold plan, silver plan: 'plan_Eyw8BcuV5qyAV2'
    });

    console.log(subscribe.status);
    if (subscribe.status === 200) console.log('Purchase Complete!');
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <CheckBox
          toggleBasic={this.toggleBasicPlan}
          togglePremium={this.togglePremiumPlan}
        />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default waitForProfile(injectStripe(CheckoutForm));
