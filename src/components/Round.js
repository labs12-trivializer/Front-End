import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  withStyles,
  CardHeader,
  IconButton
} from '@material-ui/core';
import { deleteRound } from '../actions';
import { compose } from 'redux';
import DeleteIcon from '@material-ui/icons/DeleteOutline';

const styles = theme => ({
  card: {
    flex: 1,
    margin: theme.spacing(3),
    boxShadow: theme.shadows[5],
    transition: 'box-shadow 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: '#FFF',
      boxShadow: theme.shadows[20]
    }
  },
  cardContent: {
    minHeight: '10rem'
  }
});

const Round = ({ classes, index, round, deleteRound }) => {
  return (
    <Card className={classes.card} key={`rnd${round.id}`}>
      <CardActionArea component={Link} to={`/rounds/${round.id}`}>
        <CardHeader
          action={
            <IconButton onClick={() => deleteRound(round.id, round.game_id)}>
              <DeleteIcon />
            </IconButton>
          }
          title={`Round ${index || round.number}`}
        />
        <CardContent className={classes.cardContent} />
      </CardActionArea>
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
