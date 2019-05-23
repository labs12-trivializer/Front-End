import React, { Component, useState } from 'react';
import ReactToPrint from 'react-to-print';
import { Button, withStyles, MenuItem, Menu } from '@material-ui/core';
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
    const { classes, round, highlightAnswers, ...rest } = this.props;
    return (
      <div className={classes.pageContainer}>
        <PrintableRound
          highlightAnswers={highlightAnswers}
          roundId={round.id}
          key={round.id}
          {...rest}
        />
      </div>
    );
  }
}

class PrintRoundMenuItem extends Component {
  render() {
    const {
      handleClose,
      round,
      variation,
      highlightAnswers,
      classes,
      label
    } = this.props;

    return (
      <>
        <ReactToPrint
          trigger={() => <MenuItem>{label || 'Multiple Choice'}</MenuItem>}
          content={() => this.componentRef}
          onAfterPrint={handleClose}
        />
        <div style={{ display: 'none' }}>
          <PrintableRoundContainer
            round={round}
            ref={el => (this.componentRef = el)}
            classes={classes}
            highlightAnswers={highlightAnswers}
            variation={variation}
          />
        </div>
      </>
    );
  }
}

// the exported component, if the highlightAnswers prop is true,
// they'll be highlighted in the printout
const PrintRoundButton = ({ round, label, highlightAnswers, classes }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <Button
        aria-haspopup="true"
        aria-owns={anchorEl ? 'question-sheet' : undefined}
        onClick={handleClick}
        variant="contained"
        color="primary"
      >
        {label || 'Print Questions'}
      </Button>
      <Menu
        id="question-sheet"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
      >
        <PrintRoundMenuItem
          round={round}
          highlightAnswers={highlightAnswers}
          classes={classes}
          handleClose={handleClose}
        />
        <PrintRoundMenuItem
          round={round}
          highlightAnswers={highlightAnswers}
          classes={classes}
          handleClose={handleClose}
          variation="fill-in-the-blank"
          label="Fill In The Blank"
        />
      </Menu>
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
