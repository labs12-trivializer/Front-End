import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  withStyles
} from '@material-ui/core';
import { deleteRound } from '../actions';
import { compose } from 'redux';

// A page seems to be ~1050px high with react-print
// With padding, there's about 950px of
// vertical area, 705px of horizontal per page

const styles = theme => ({
  card: {
    flex: 1,
    margin: theme.spacing(1)
  },
  cardContent: {
    minHeight: '20rem'
  }
});

const Round = ({ classes, index, round, deleteRound }) => {
  return (
    <Card className={classes.card} key={`rnd${round.id}`}>
      <CardActionArea component={Link} to={`/rounds/${round.id}`}>
        <CardContent className={classes.cardContent}>
          <Typography
            component="h2"
            variant="h5"
            className={classes.title}
            color="textPrimary"
            gutterBottom
          >
            {`Round ${index || round.number}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <div
        onClick={() => deleteRound(round.id, round.game_id)}
        className="fas fa-trash-alt"
      />
    </Card>
  );
};

const mapStateToProps = (state, ownProps) => ({
  round: state.rounds.byId[ownProps.roundId]
});

export default compose(
  connect(
    mapStateToProps,
    {
      deleteRound
    }
  ),
  withStyles(styles, { withTheme: true })
)(Round);
