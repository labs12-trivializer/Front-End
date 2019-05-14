import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardElement, injectStripe } from 'react-stripe-elements';
import CheckBox from './CheckBox';
import { upgradeTier } from '../../actions';

class _CheckoutForm extends Component {
  constructor(props) {
    super(props);
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

  upgradeTier = async () => {
    //create token from payment info
    let { token } = await this.props.stripe.createToken({
      name: this.props.profile.username
    });
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
    this.props.upgradeTier(plan, this.props.profile.username, token);
  };

  render() {
    if (this.props.profile.tier_name !== 'gold') {
      return (
        <div className="checkout">
          <h2>Current Tier: {this.props.profile.tier_name}</h2>
          <p>Payment Info:</p>
          <CardElement />
          <CheckBox
            toggleBasic={this.toggleBasicPlan}
            togglePremium={this.togglePremiumPlan}
            tier={this.props.profile.tier_name}
          />
          <button onClick={this.upgradeTier}>Send</button>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Current Tier: {this.props.profile.tier_name}</h2>
          <h1>You are already subscribed to the highest tier plan</h1>
        </div>
      );
    }
  }
}

const CheckoutForm = injectStripe(_CheckoutForm);

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { upgradeTier }
)(CheckoutForm);
