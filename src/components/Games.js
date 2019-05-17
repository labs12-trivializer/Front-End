import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import waitForLogin from './waitForLogin';
import { getAllGames } from '../reducers';
import { fetchGames, createNewGame } from '../actions';

import { Title } from '../styles/shared.css';
import Modal from './Modal';
import NewGameForm from './NewGameForm';
import { withStyles } from '@material-ui/styles';
import {
  Card,
  Button,
  CardContent,
  Typography,
  withWidth,
  CardActionArea
} from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';

const styles = theme => ({
  card: {
    flex: 1,
    margin: theme.spacing.unit
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

class Games extends Component {
  state = { modalShowing: false };
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount = () => {
    this.props.fetchGames();
    console.log(this.props.auth);
  };

  onCreateGame = game => {
    this.props.createNewGame(game).then(success => {
      this.props.history.push(`/games/${success.data.result}`);
    });
  };

  groupGames = (number = 3) => {
    const { classes } = this.props;
    const newGameCard = (
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography
              component="h2"
              variant="h5"
              className={classes.title}
              color="textPrimary"
              gutterBottom
            >
              Create New Game
            </Typography>
            {this.props.games.length >= this.props.gameLimit ? (
              <Link to="/billing">Upgrade For more games</Link>
            ) : (
              <Button onClick={() => this.setState({ modalShowing: true })}>
                Create New Game
              </Button>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    );

    const games = [
      ...this.props.games.map(g => (
        <Card className={classes.card} key={`game${g.id}`}>
          <CardActionArea>
            <CardContent>
              <Typography
                component="h2"
                variant="h5"
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                {g.name}
              </Typography>
              <Typography component="p">
                Rounds: {g.num_rounds}
                <br />
                Questions: {g.num_questions}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )),
      newGameCard
    ];

    const groups = [];
    let group = [];
    games.forEach((g, idx) => {
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
    const { classes } = this.props;

    return (
      <>
        {this.state.modalShowing && (
          <Modal onClose={() => this.setState({ modalShowing: false })}>
            <NewGameForm
              onDone={this.onCreateGame}
              onCancel={() => this.setState({ modalShowing: false })}
            />
          </Modal>
        )}
        <Title>Games</Title>
        <div className={classes.cardList}>
          {this.groupGames(isWidthUp('sm', this.props.width) ? 3 : 1).map(
            (g, idx) => (
              <div className={classes.cardRow} key={`cr${idx}`}>
                {g}
              </div>
            )
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  games: getAllGames(state),
  gameLimit: state.profile.game_limit
});

export default waitForLogin(
  withWidth()(
    withStyles(styles, { withTheme: true })(
      connect(
        mapStateToProps,
        {
          fetchGames,
          createNewGame
        }
      )(Games)
    )
  )
);
