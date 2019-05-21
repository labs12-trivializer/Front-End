import React from 'react';
import { getRoundById } from '../reducers';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PrintableQuestion from './PrintableQuestion';
import { Typography, withStyles } from '@material-ui/core';
import chunk from '../helpers/chunk';

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
const PrintableRound = ({ round, game, index, classes }) => (
  <>
    {chunk(round.questions, 5).map((questionGroup, outerIdx) => (
      <div className={classes.page} key={'pg' + outerIdx}>
        <Typography variant="h5" color="textPrimary" gutterBottom>
          {game && `${game.name}, Round ${index + 1}`}
        </Typography>
        {questionGroup.map((q, idx) => (
          <PrintableQuestion index={idx + (outerIdx * 5)} questionId={q} key={'r' + q} />
        ))}
      </div>
    ))}
  </>
);

const mapStateToProps = (state, ownProps) => ({
  round: getRoundById(state, ownProps.roundId)
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles, { withTheme: true })
)(PrintableRound);
