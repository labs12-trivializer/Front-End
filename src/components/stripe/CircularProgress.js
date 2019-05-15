import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import PaymentIcon from '@material-ui/icons/Payment';
import { upgradeTier, fetchProfile } from '../../actions';
import { ProgressDiv } from '../../styles/billing.css';
const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative'
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
});

class CircularIntegration extends React.Component {
  state = {
    loading: false,
    success: false
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  upgradeTier = async () => {
    if (!this.state.loading) {
      this.setState({
        success: false,
        loading: true
      });
    }
    console.log('here');
    //create token from payment info
    let { token } = await this.props.stripe.createToken({
      name: this.props.profile.username
    });
    const gold = 'plan_Eyw9DUPvzcFMvK';
    const silver = 'plan_Eyw8BcuV5qyAV2';
    let plan = null;
    if (this.props.premiumPlan && !this.props.basicPlan) {
      plan = gold;
    } else if (this.props.basicPlan && !this.props.premiumPlan) {
      plan = silver;
    } else {
      return;
    }
    this.props
      .upgradeTier(plan, this.props.profile.username, token)
      .then(res => {
        this.setState({
          loading: false,
          success: true
        });
      })
      .then(res => this.props.fetchProfile())
      .catch(err => console.log(err))
      .catch(err => console.log(err));
  };

  render() {
    const { loading, success } = this.state;
    const { classes } = this.props;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: success
    });

    return (
      <>
        <div className={classes.root}>
          <ProgressDiv className={classes.wrapper}>
            <Fab color="primary" className={buttonClassname}>
              {success ? <CheckIcon /> : <PaymentIcon />}
            </Fab>
            {loading && (
              <CircularProgress size={68} className={classes.fabProgress} />
            )}
          </ProgressDiv>
          <ProgressDiv className={classes.wrapper}>
            <Button
              variant="contained"
              color="primary"
              className={buttonClassname}
              disabled={loading}
              onClick={this.upgradeTier}
            >
              Pay With Card
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </ProgressDiv>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { upgradeTier, fetchProfile }
)(withStyles(styles)(CircularIntegration));
