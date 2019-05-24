import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { upgradeTier } from '../../actions';
import CircularProgress from './CircularProgress';
//import { FormDiv, Header } from '../../styles/billing.css';
import { FormDiv } from '../../styles/billing.css';
import { Card, withStyles } from '@material-ui/core';

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

const styles = theme => ({
  checkout: {
    padding: theme.spacing(3),
    width: 'max-content',
    margin: '0 auto',
    boxShadow: 'none'
  }
});

class _CheckoutForm extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Card className={classes.checkout}>
          {this.props.upgradingTo === 'Gold' ? (
            <h2>Upgrade to Gold for $29.99 per year</h2>
          ) : (
            <h2>Upgrade to Silver for $9.99 per year</h2>
          )}
          <p>Payment Info:</p>
          <FormDiv>
            <CardElement {...createOptions()} />
          </FormDiv>
          <CircularProgress
            stripe={this.props.stripe}
            upgradingTo={this.props.upgradingTo}
          />
        </Card>
      </>
    );
  }
}

const CheckoutForm = injectStripe(_CheckoutForm);

const mapStateToProps = state => ({
  profile: state.profile
});

export default compose(
  connect(
    mapStateToProps,
    { upgradeTier }
  ),
  withStyles(styles, { withTheme: true })
)(CheckoutForm);
