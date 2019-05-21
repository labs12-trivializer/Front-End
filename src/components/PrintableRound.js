import React, { useEffect } from 'react';
import { getRoundById } from '../reducers';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PrintableQuestion from './PrintableQuestion';
import { Typography, withStyles } from '@material-ui/core';
import chunk from '../helpers/chunk';
import { getGameById } from '../reducers';
import { fetchGame } from '../actions';

// these page styles seem to work for splitting pages
// a page is around 950px high by 705px wide
const styles = () => ({
  page: {
    height: '95vh',
    padding: '5vh',
    boxSizing: 'border-box'
  }
});

// group questions into groups of 5, make a page for each group
const PrintableRound = ({
  highlightAnswers,
  fetchGame,
  round,
  game,
  index,
  classes
}) => {
  useEffect(() => {
    if (!game) {
      fetchGame(round.game_id);
    }
  }, [fetchGame, round, game]);

  return (
    <>
      {chunk(round.questions, 5).map((questionGroup, outerIdx) => (
        <div className={classes.page} key={'pg' + outerIdx}>
          <Typography variant="h5" color="textPrimary" gutterBottom>
            {highlightAnswers && '**ANSWER SHEET** '}
            {game &&
              `${game.name}, Round ${(index && index + 1) || round.number}`}
          </Typography>
          {questionGroup.map((q, idx) => (
            <PrintableQuestion
              highlightAnswers={highlightAnswers}
              index={idx + outerIdx * 5}
              questionId={q}
              key={'r' + q}
            />
          ))}
        </div>
      ))}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const round = getRoundById(state, ownProps.roundId);
  const game = round ? getGameById(state, round.game_id) : null;

  return {
    round: getRoundById(state, ownProps.roundId),
    game
  };
};

export default compose(
  connect(
    mapStateToProps,
    { fetchGame }
  ),
  withStyles(styles, { withTheme: true })
)(PrintableRound);
