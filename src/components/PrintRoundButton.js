import React, { useRef, Component } from 'react';
import ReactToPrint from 'react-to-print';
import { Button, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getRoundById } from '../reducers';
import PrintableRound from './PrintableRound';

const styles = () => ({
  pageContainer: {
    margin: 0,
    padding: 0
  }
});

class PrintableRoundContainer extends Component {
  render() {
    const { classes, round, highlightAnswers } = this.props;
    return (
      <div className={classes.pageContainer}>
        <PrintableRound
          highlightAnswers={highlightAnswers}
          roundId={round.id}
          key={round.id}
        />
      </div>
    );
  }
}

// the exported component, if the highlightAnswers prop is true,
// they'll be highlighted in the printout
const PrintRoundButton = ({ round, classes, label, highlightAnswers }) => {
  const componentRef = useRef();
  return (
    <>
      <ReactToPrint
        trigger={() => (
          <Button variant="contained" color="primary">
            {label || 'Generate Question Sheet'}
          </Button>
        )}
        content={() => componentRef.current}
      />
      <div style={{ display: 'none' }}>
        <PrintableRoundContainer
          round={round}
          ref={componentRef}
          classes={classes}
          highlightAnswers={highlightAnswers}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  round: getRoundById(state, ownProps.roundId)
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles, { withTheme: true })
)(PrintRoundButton);
