import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import {
  Card,
  CardContent,
  Typography,
  CardActionArea
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    margin: theme.spacing(3),
    boxShadow: theme.shadows[5],
    transition: 'box-shadow 0.3s ease-in-out !important',
    '&:hover': {
      backgroundColor: '#FFF',
      boxShadow: theme.shadows[20]
    }
  },
  cardContent: {
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
  }
});

const UpgradeCard = ({ message, classes }) => (
  <Card className={classes.card}>
    <CardActionArea
      component={Link}
      to="/billing"
      className={classes.cardContent}
    >
      <CardContent className={classes.cardContent}>
        <Typography
          component="h2"
          variant="h5"
          className={classes.title}
          color="textPrimary"
          gutterBottom
        >
          {message || 'Upgrade for more Features'}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

// use compose with with withStyles applied last
export default compose(withStyles(styles, { withTheme: true }))(UpgradeCard);
