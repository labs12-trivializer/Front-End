import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllGames } from '../reducers';
import { fetchGames, createNewGame } from '../actions';

import { withStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Typography,
  withWidth,
  CardActionArea,
  CardHeader,
  Tooltip
} from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';
import NewGameDialog from './NewGameDialog';
import UpgradeCard from './UpgradeCard';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import clsx from 'clsx';
import colorFromId from '../helpers/colorFromId';
import { TagCloud } from 'react-tagcloud';

const styles = theme => ({
  icon: {
    color: theme.palette.grey[400],
    fontSize: 40
  },
  card: {
    display: 'flex',
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
    minHeight: '10rem',
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
    visiblity: 'hidden',
    margin: theme.spacing(3)
  },
  newGameCard: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1
  }
});

class Games extends Component {
  state = { modalShowing: false };

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
    const newGameCard =
      this.props.games.length >= this.props.gameLimit ? (
        <UpgradeCard message="Upgrade for more Games" key="upgradeCard" />
      ) : (
        <Card
          className={clsx(classes.card, classes.newGameCard)}
          key="createGameCard"
        >
          <Tooltip title="Add Game" aria-label="Add Game">
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
      );

    const games = [
      ...this.props.games.map((g, idx) => (
        <Card className={classes.card} key={`gme${g.id}`}>
          <CardActionArea component={Link} to={`/games/${g.id}`}>
            <CardHeader
              title={g.name}
              style={{ backgroundColor: colorFromId(g.id) }}
            />
            <CardContent className={classes.cardContent}>
              {g.category_counts && (
                <TagCloud
                  minSize={12}
                  maxSize={18}
                  colorOptions={{ luminosity: 'dark' }}
                  tags={g.category_counts
                    .sort()
                    .slice(-5)
                    .map(cc => ({
                      value: cc.name.split(':').slice(-1),
                      count: cc.count
                    }))}
                />
              )}
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
        <NewGameDialog
          open={this.state.modalShowing}
          onCancel={() => this.setState({ modalShowing: false })}
          onCreate={this.onCreateGame}
        />
        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
          Game List
        </Typography>
        <div className={classes.cardList}>
          {this.groupGames(cardsPerRow).map((g, idx) => (
            <div className={classes.cardRow} key={`cr${idx}`}>
              {g}
            </div>
          ))}
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
