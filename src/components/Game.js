import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  fetchGame,
  editGame,
  deleteGame,
  addRound,
  deleteRound
} from '../actions';
// import { GameInput, InputControls, RoundList } from '../styles/game.css';
import Round from './Round';
import {
  withStyles,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  withWidth,
  Grid,
  Tooltip
} from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';
import { compose } from 'redux';
import UpgradeCard from './UpgradeCard';
import NewRoundDialog from './NewRoundDialog';
import PrintGameQuestionsButton from './PrintGameQuestionsButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import clsx from 'clsx';

const initialState = props => ({
  title: props.game && props.game.name,
  editingTitle: false,
  modalShowing: false
});

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
  newGameCard: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minHeight: 232
  },
  icon: {
    color: theme.palette.grey[400],
    fontSize: 40
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1
  },
  pos: {
    marginBottom: 12
  },
  cardList: {
    display: 'flex',
    flexDirection: 'column'
  },
  cardRow: {
    display: 'flex'
  },
  nothing: {
    flex: 1,
    margin: theme.spacing(3),
    visiblity: 'hidden'
  },
  button: {
    margin: theme.spacing(2)
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    '& button': {
      margin: theme.spacing(1)
    }
  }
});

class Game extends Component {
  state = initialState(this.props);

  componentDidMount = () => {
    this.props.fetchGame(this.props.match.params.id);
  };

  handleAddNewRound = async () => {
    await this.props
      .addRound({
        game_id: this.props.game.id,
        number: this.props.game.rounds ? this.props.game.rounds.length + 1 : 1
      })
      .then(() => {
        this.props.fetchGame(this.props.match.params.id);
      });
  };
  deleteRound = (round_id, game_id) => {
    this.props.deleteRound(round_id, game_id);
  };

  deleteGame = async () => {
    await this.props.deleteGame(this.props.match.params.id);
    this.props.history.replace('/games');
  };

  updateTitle = event => {
    this.setState({
      title: event.target.value
    });
  };

  handleInputClick = () => {
    this.setState({ editingTitle: true });
  };

  handleTitleRename = async () => {
    await this.props.editGame(this.props.game.id, {
      name: this.state.title
    });

    this.setState({ editingTitle: false });
  };

  handleTitleCancel = () => {
    this.setState(initialState(this.props));
  };

  // group rounds into separate arrays of rounds
  groupRounds = (number = 3) => {
    const {
      game: { rounds },
      classes,
      roundLimit
    } = this.props;

    const newRoundCard =
      rounds.length < roundLimit ? (
        <Card
          className={clsx(classes.card, classes.newGameCard)}
          key="newRoundCard"
        >
          <Tooltip title="Add Round" aria-label="Add Round">
            <CardActionArea
              className={classes.cardActions}
              onClick={() => this.setState({ modalShowing: true })}
            >
              <CardContent
                className={clsx(classes.cardContent, classes.newGameCard)}
              >
                <Typography
                  component="h2"
                  variant="h5"
                  className={classes.title}
                  color="textPrimary"
                  gutterBottom
                >
                  <AddCircleIcon className={classes.icon} />
                </Typography>
              </CardContent>
            </CardActionArea>
          </Tooltip>
        </Card>
      ) : (
        <UpgradeCard message="Upgrade for more Rounds" key={'newRoundCard'} />
      );

    const roundComponents = [
      ...rounds.map((r, idx) => (
        <Round roundId={r} index={idx + 1} key={`r${r}`} />
      )),
      newRoundCard
    ];

    const groups = [];
    let group = [];
    roundComponents.forEach((g, idx) => {
      if (idx % number === 0) {
        groups.push(group);
        group = [];
      }

      group.push(g);
    });

    if (group.length > 0) {
      while (group.length < number) {
        group.push(
          <div className={classes.nothing} key={'filler' + group.length} />
        );
      }
      groups.push(group);
    }

    return groups;
  };

  render() {
    const { classes, width, game } = this.props;
    if (!game || !game.rounds) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
          <NewRoundDialog
            open={this.state.modalShowing}
            onCancel={() => this.setState({ modalShowing: false })}
            roundNumber={game.rounds.length + 1}
            gameId={game.id}
          />

          <Grid container>
            <Grid item xs={12} sm={8}>
              <Typography component="h3" variant="h6">
                {game.name}
              </Typography>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                Round List
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} className={classes.buttonContainer}>
              <PrintGameQuestionsButton gameId={game.id} />
              <PrintGameQuestionsButton
                label="Print Answers"
                highlightAnswers
                gameId={game.id}
              />
            </Grid>
            <Grid item xs={12} className={classes.cardList}>
              {this.groupRounds(isWidthUp('sm', width) ? 3 : 1).map(
                (r, idx) => (
                  <div className={classes.cardRow} key={`cr${idx}`}>
                    {r}
                  </div>
                )
              )}
            </Grid>
          </Grid>
        </>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  game: state.games.byId[ownProps.match.params.id],
  roundLimit: state.profile.round_limit
});

export default compose(
  connect(
    mapStateToProps,
    {
      fetchGame,
      editGame,
      deleteGame,
      addRound,
      withRouter,
      deleteRound
    }
  ),
  withWidth(),
  withStyles(styles, { withTheme: true })
)(Game);
