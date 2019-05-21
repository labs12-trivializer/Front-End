import React, { Component } from 'react';
import { connect } from 'react-redux';
import waitForProfile from '../waitForProfile';
import Pricing from './Pricing';
import { Header } from '../../styles/billing.css';
import { toast } from 'react-toastify';
import { css } from 'glamor';
import StripeDialog from './StripeDialog';
class Stripe extends Component {
  state = {
    showStripe: false,
    upgradingTo: ''
  };

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

  handleOpen = tier => {
    this.setState({
      showStripe: true,
      upgradingTo: tier
    });
  };

  handleClose = () => {
    this.setState({ showStripe: false });
  };

  render() {
    return (
      <>
        <Pricing
          tier={this.props.profile.tier_name}
          handleOpen={this.handleOpen}
        />
        <Header>Current Tier: {this.props.profile.tier_name}</Header>

        <StripeDialog
          upgradingTo={this.state.upgradingTo}
          showStripe={this.state.showStripe}
          handleClose={this.handleClose}
        />
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
