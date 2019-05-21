import React, { useRef, Component } from 'react';
import ReactToPrint from 'react-to-print';
import { Button, withStyles } from '@material-ui/core';
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
    const { classes, game, highlightAnswers } = this.props;
    return (
      <div className={classes.pageContainer}>
        {game.rounds.map((r, idx) => (
          <PrintableRound
            highlightAnswers={highlightAnswers}
            index={idx}
            roundId={r}
            key={r}
          />
        ))}
      </div>
    );
  }
}

// the exported component, if the highlightAnswers prop is true,
// they'll be highlighted in the printout
const PrintGameQuestionsButton = ({
  game,
  classes,
  label,
  highlightAnswers
}) => {
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
        <PrintableGame
          game={game}
          ref={componentRef}
          classes={classes}
          highlightAnswers={highlightAnswers}
        />
      </div>
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
