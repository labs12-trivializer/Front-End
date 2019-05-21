import React, { Component } from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { Dialog } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';

//dialog transition up up
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none'
  }
});

class _StripeDialog extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.paper}>
        <Dialog
          open={this.props.showStripe}
          onClose={() => this.props.handleClose()}
          TransitionComponent={Transition}
          fullWidth={true}
        >
          <StripeProvider apiKey="pk_test_rLIPiZV9cJfPy9p4WZgEMCbA00qbhu5zTZ">
            <Elements>
              <CheckoutForm upgradingTo={this.props.upgradingTo} />
            </Elements>
          </StripeProvider>
        </Dialog>
      </div>
    );
  }
}

const StripeDialog = withStyles(styles)(_StripeDialog);

export default StripeDialog;
