import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllGames } from '../reducers';
import { fetchGames, createNewGame } from '../actions';

import Modal from './Modal';
import NewGameForm from './NewGameForm';
import { withStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Typography,
  withWidth,
  CardActionArea,
  Grow,
  Zoom
} from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';

const styles = theme => ({
  card: {
    flex: 1,
    margin: theme.spacing(1)
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

class Games extends Component {
  state = { modalShowing: false };
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount = () => {
    this.props.fetchGames();
  };

  onCreateGame = game => {
    this.props.createNewGame(game).then(success => {
      this.props.history.push(`/games/${success.data.result}`);
    });
  };

  groupGames = (number = 3) => {
    const { classes } = this.props;
    const newGameCard = (
      <Card className={classes.card} key="test">
        <CardActionArea onClick={() => this.setState({ modalShowing: true })}>
          <CardContent className={classes.cardContent}>
            <Typography
              component="h2"
              variant="h5"
              className={classes.title}
              color="textPrimary"
              gutterBottom
            >
              Create New Game
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );

    // {this.props.games.length >= this.props.gameLimit ? (
    //          <Link to="/billing">Upgrade For more games</Link>
    //        ) : (
    //          <Button onClick={() => this.setState({ modalShowing: true })}>
    //            Create New Game
    //          </Button>
    //        )}
    const games = [
      ...this.props.games.map((g, idx) => (
        <Card className={classes.card} key={`gme${g.id}`}>
          <CardActionArea component={Link} to={`/games/${g.id}`}>
            <CardContent className={classes.cardContent}>
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
        group.push(
          <div className={classes.nothing} key={`nope${group.length}`} />
        );
      }
      groups.push(group);
    }

    return groups;
  };

  render() {
    const { classes } = this.props;
    const cardsPerRow = isWidthUp('sm', this.props.width) ? 3 : 1;

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
        <Typography component="h1" variant="h1" color="inherit" gutterBottom>
          Game List
        </Typography>
        <div className={classes.cardList}>
          {this.groupGames(cardsPerRow).map(
            (g, idx) => (
              <div className={classes.cardRow} key={`cr${idx}`}>
                {g.map((gameCard, gcIdx) => (
                  <Zoom
                    in
                    style={{ transitionDelay: (cardsPerRow * idx + gcIdx) * 50}}
                    key={`gc${gcIdx + (cardsPerRow * idx)}`}
                  >
                    {gameCard}
                  </Zoom>
                ))}
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

// use compose with with withStyles applied last
export default compose(
  connect(
    mapStateToProps,
    { fetchGames, createNewGame }
  ),
  withWidth(),
  withStyles(styles, { withTheme: true })
)(Games);
