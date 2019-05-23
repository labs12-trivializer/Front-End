import React, { Component, useState } from 'react';
import ReactToPrint from 'react-to-print';
import { Button, withStyles, Menu, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getGameById } from '../reducers';
import PrintableRound from './PrintableRound';

const styles = () => ({
  pageContainer: {
    margin: 0,
    padding: 0
  }
});

class PrintableGame extends Component {
  render() {
    const { variation, classes, game, highlightAnswers } = this.props;
    return (
      <div className={classes.pageContainer}>
        {game.rounds.map((r, idx) => (
          <PrintableRound
            highlightAnswers={highlightAnswers}
            index={idx}
            roundId={r}
            key={r}
            variation={variation}
          />
        ))}
      </div>
    );
  }
}

class PrintGameMenuItem extends Component {
  render() {
    const {
      handleClose,
      game,
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
          <PrintableGame
            game={game}
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
const PrintGameQuestionsButton = ({
  game,
  label,
  highlightAnswers,
  classes
}) => {
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
        <PrintGameMenuItem
          game={game}
          highlightAnswers={highlightAnswers}
          classes={classes}
          handleClose={handleClose}
        />
        <PrintGameMenuItem
          game={game}
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
  game: getGameById(state, ownProps.gameId)
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles, { withTheme: true })
)(PrintGameQuestionsButton);
