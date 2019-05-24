import React, { useEffect } from 'react';
import { getRoundById } from '../reducers';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PrintableQuestion from './PrintableQuestion';
import { Typography, withStyles } from '@material-ui/core';
import chunk from '../helpers/chunk';
import { getGameById } from '../reducers';
import { fetchGame } from '../actions';
import { Image } from 'cloudinary-react';

// these page styles seem to work for splitting pages
// a page is around 950px high by 705px wide
const styles = theme => ({
  page: {
    height: '100vh',
    padding: '5vh',
    boxSizing: 'border-box'
  },
  teamName: {
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    marginBottom: theme.spacing(2)
  },
  header: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '50%',
    flex: 1
  },
  avatar: {
    margin: '.5rem',
    width: 80,
    height: 80,
    cursor: 'pointer',
    borderRadius: '50%'
  }
});

// group questions into groups of 5, make a page for each group
const PrintableRound = ({
  highlightAnswers,
  fetchGame,
  round,
  game,
  index,
  variation,
  classes,
  logoId
}) => {
  useEffect(() => {
    if (!game) {
      fetchGame(round.game_id);
    }
  }, [fetchGame, round, game]);
  const teamNameDiv = (
    <div className={classes.teamName}>
      <Typography>Team Name:</Typography>
    </div>
  );

  const questionsPerSheet = variation === 'fill-in-the-blank' ? 8 : 5;

  return (
    <>
      {chunk(round.questions, questionsPerSheet).map((questionGroup, outerIdx) => (
        <div className={classes.page} key={'pg' + outerIdx}>
          <div className={classes.header}>
            <Typography
              className={classes.headerLeft}
              variant="h5"
              color="textPrimary"
              gutterBottom
            >
              {!highlightAnswers && teamNameDiv}
              {highlightAnswers && '**ANSWER SHEET** '}
              {game &&
                `${game.name}, Round ${(index && index + 1) ||
                  round.number} / ${game.rounds.length}`}
            </Typography>
            {logoId && (
                <Image
                  alt="Your Logo"
                  cloudName="trivializer"
                  publicId={logoId}
                  className={classes.avatar}
                />
              )}
          </div>
          {questionGroup.map((q, idx) => (
            <PrintableQuestion
              highlightAnswers={highlightAnswers}
              index={idx + outerIdx * questionsPerSheet}
              questionId={q}
              key={'r' + q}
              variation={variation}
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
    logoId: state.profile.logo_id,
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
