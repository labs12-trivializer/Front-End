import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardElement, injectStripe } from 'react-stripe-elements';
import CheckBox from './CheckBox';
import { upgradeTier } from '../../actions';
import CircularProgress from './CircularProgress';
import { toast } from 'react-toastify';
import { css } from 'glamor';
import { FormDiv, Header } from '../../styles/billing.css';
import { Card } from '@material-ui/core';

//stripe input styling
const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'Open Sans, sans-serif',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#c23d4b'
      }
    }
  };
};

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
      <>
        {/* <Header>Current Tier: {this.props.profile.tier_name}</Header> */}
        <Card className="checkout">
          <p>Payment Info:</p>
          <FormDiv>
            <CardElement {...createOptions()} />
          </FormDiv>
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
          {/* {this.state.basicPlan !== this.state.premiumPlan && (
          <CircularProgress
            basicPlan={this.state.basicPlan}
            premiumPlan={this.state.premiumPlan}
            stripe={this.props.stripe}
          />
        )} */}
        </Card>
      </>
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
