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
    const { classes, game } = this.props;
    return (
      <div className={classes.pageContainer}>
        {game.rounds.map((r, idx) => (
          <PrintableRound game={game} index={idx} roundId={r} key={r} />
        ))}
      </div>
    );
  }
}

const PrintGameQuestionsButton = ({ game, classes }) => {
  const componentRef = useRef();
  return (
    <>
      <ReactToPrint
        trigger={() => (
          <Button variant="contained" color="primary">
            Generate Question Sheet
          </Button>
        )}
        content={() => componentRef.current}
      />
      <div style={{ display: 'none' }}>
        <PrintableGame game={game} ref={componentRef} classes={classes} />
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
