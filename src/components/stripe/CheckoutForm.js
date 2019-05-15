import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardElement, injectStripe } from 'react-stripe-elements';
import CheckBox from './CheckBox';
import { upgradeTier } from '../../actions';
import CircularProgress from './CircularProgress';
import { toast } from 'react-toastify';
import { css } from 'glamor';

class _CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basicPlan: false,
      premiumPlan: false
    };
  }

  componentDidMount() {
    if (this.props.profile.tier_name === 'gold') {
      toast.info('🎉 You are currently subscribed our highest tier plan!', {
        position: toast.POSITION.TOP_RIGHT,
        className: css({
          background: '#19b9e9',
          textAlign: 'center'
        })
      });
    }
  }
  toggleBasicPlan = e => {
    this.setState({ basicPlan: !this.state.basicPlan });
  };
  togglePremiumPlan = e => {
    this.setState({ premiumPlan: !this.state.premiumPlan });
  };

  render() {
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
        <CircularProgress
          basicPlan={this.state.basicPlan}
          premiumPlan={this.state.premiumPlan}
          stripe={this.props.stripe}
        />
      </div>
    );
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
