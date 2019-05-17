import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {
  fetchGame,
  editGame,
  deleteGame,
  addRound,
  deleteRound
} from '../actions';
import { Background, Button, ButtonRow } from '../styles/shared.css';
// import { GameInput, InputControls, RoundList } from '../styles/game.css';
import Round from './Round';
import Modal from './Modal';
import NewRoundForm from './NewRoundForm';
import {
  withStyles,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  withWidth
} from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';

const initialState = props => ({
  title: props.game && props.game.name,
  editingTitle: false,
  modalShowing: false
});

const styles = theme => ({
  card: {
    flex: 1,
    margin: theme.spacing.unit
  },
  cardContent: {
    minHeight: '20rem'
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
    margin: '0.5rem',
    visiblity: 'hidden'
  }
});

class Game extends Component {
  state = initialState(this.props);

  componentDidMount = () => {
    console.log('Game Info:', this.props.game);
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
        <Card className={classes.card}>
          <CardActionArea onClick={() => this.setState({ modalShowing: true })}>
            <CardContent className={classes.cardContent}>
              <Typography
                component="h2"
                variant="h5"
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Create New Round
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ) : (
        <Card className={classes.card}>
          <CardActionArea component={Link} to="/billing">
            <CardContent className={classes.cardContent}>
              <Typography
                component="h2"
                variant="h5"
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Upgrade for more rounds
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );

    const roundComponents = [
      ...rounds.map((r, idx) => <Round roundId={r} index={idx + 1} />),
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
        group.push(<div className={classes.nothing} />);
      }
      groups.push(group);
    }

    return groups;
  };

  render() {
    const { classes, width } = this.props;
    if (!this.props.game || !this.props.game.rounds) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
          {this.state.modalShowing && (
            <Modal onClose={() => this.setState({ modalShowing: false })}>
              <NewRoundForm
                gameId={this.props.game.id}
                number={
                  this.props.game.rounds ? this.props.game.rounds.length + 1 : 1
                }
                onCancel={() => this.setState({ modalShowing: false })}
              />
            </Modal>
          )}

          <Background />
          <Typography component="h1" variant="h1" color="inherit" gutterBottom>
            Round List
          </Typography>
          <div className={classes.cardList}>
            {this.groupRounds(isWidthUp('sm', width) ? 3 : 1).map((r, idx) => (
              <div className={classes.cardRow} key={`cr${idx}`}>
                {r}
              </div>
            ))}
          </div>
        </>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  game: state.games.byId[ownProps.match.params.id],
  roundLimit: state.profile.round_limit
});

export default withWidth()(
  withStyles(styles, { withTheme: true })(
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
    )(Game)
  )
);
//          <GameInput
//            value={this.state.title}
//            onChange={this.updateTitle}
//            onClick={this.handleInputClick}
//          />
//          {this.state.editingTitle && (
//            <InputControls>
//              <span onClick={this.handleTitleRename}>Rename</span>
//              <span onClick={this.handleTitleCancel}>Cancel</span>
//            </InputControls>
//          )}
