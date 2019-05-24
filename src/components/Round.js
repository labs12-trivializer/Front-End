import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  withStyles,
  CardHeader,
  IconButton,
  Tooltip,
  Typography
} from '@material-ui/core';
import { deleteRound } from '../actions';
import { compose } from 'redux';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import { TagCloud } from 'react-tagcloud';

const styles = theme => ({
  card: {
    flex: 1,
    margin: theme.spacing(3),
    boxShadow: theme.shadows[5],
    transform: 'translateY(0)',
    transition: [
      ['box-shadow', '300ms', 'ease-in-out'],
      ['transform', '300ms', 'ease-in-out'],
      '!important'
    ],
    '&:hover': {
      backgroundColor: '#FFF',
      boxShadow: theme.shadows[20],
      transform: 'translateY(-3px)'
    }
  },
  cardContent: {
    minHeight: '10rem'
  },
  roundInfo: {
    position: 'absolute',
    bottom: 3,
    right: 8,
    fontSize: '0.8rem',
    color: theme.palette.grey[400]
  }
});

const Round = ({ classes, index, round, deleteRound }) => {
  return (
    <Card className={classes.card} key={`rnd${round.id}`}>
      <CardActionArea component={Link} to={`/rounds/${round.id}`}>
        <CardHeader
          action={
            <Tooltip title="Delete Round" aria-label="Delete">
              <IconButton onClick={() => deleteRound(round.id, round.game_id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          }
          title={`Round ${index || round.number}`}
        />
        <CardContent className={classes.cardContent}>
          {round.category_counts && (
            <TagCloud
              minSize={12}
              maxSize={18}
              colorOptions={{ luminosity: 'dark' }}
              tags={round.category_counts
                .sort()
                .slice(-5)
                .map(cc => ({
                  value: cc.name.split(':').slice(-1),
                  count: cc.count
                }))}
            />
          )}
        </CardContent>
        <Tooltip
          title={`Questions: ${round.questions ? round.questions.length : 0}`}
        >
          <Typography className={classes.roundInfo}>
            Q{round.questions ? round.questions.length : 0}
          </Typography>
        </Tooltip>
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
