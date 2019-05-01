import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
      source_token: '',
      customer_id: '',
      plan: '',
    };
  }

  //User hits submit after entering credit card info:
  async submit(ev) {
    // request to stripe API to tokenize credit card information, responds with token
    //for compliance purposes we do not handle or store the customers credit card info, we use the tokenized version returned by Stripe
    let { token } = await this.props.stripe.createToken({ name: 'Name' });
    console.log(token.id);

    //create a new customer account associated with our app on Stripe
    //this uses our backend API to communicate with Stripe
    const customer = await axios.post(
      'https://lambda-trivializer.herokuapp.com/api/billing/customer',
      {
        name: 'hardcoded testname',
        source: token.id, //using the token returned above as their payment source
      }
    );
    console.log('customer', customer);

    //Using backend api, Subscribe customer to one of our two paid plans (silver or gold)
    const subscribe = await axios.post(
      'https://lambda-trivializer.herokuapp.com/api/billing/subscribe',
      {
        customer: customer.data.id, //using customer id returned above.
        plan: 'plan_Eyw9DUPvzcFMvK', //gold plan, silver plan: 'plan_Eyw8BcuV5qyAV2'
      }
    );

    console.log(subscribe.status);
    if (subscribe.status === 200) console.log('Purchase Complete!');
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
