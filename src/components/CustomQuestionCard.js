import React from 'react';
import { Card, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const useStyles = makeStyles(theme => ({
  card: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginBottom: theme.spacing(2),
    minHeight: 200
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0
  }
}));

const CustomQuestionCard = ({ onBack }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <IconButton
        aria-label="Previous"
        className={classes.backButton}
        onClick={onBack}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>
      <Typography component="h2" variant="h5">
        Custom Question Form Goes Here!
      </Typography>
    </Card>
  );
};

export default CustomQuestionCard;

