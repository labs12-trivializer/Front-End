import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  Button,
  Typography,
  IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import PremadeQuestionsCard from './PremadeQuestionsCard';
import CustomQuestionCard from './CustomQuestionCard';

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
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1
  },
  icon: {
    color: theme.palette.grey[400],
    fontSize: 40
  },
  cardEmpty: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'stretch'
  },
  fullCardAction: {
    display: 'flex',
    flex: 1
  },
  typeChoice: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  buttonRow: {
    display: 'flex'
  },
  button: {
    margin: theme.spacing(1)
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0
  }
}));

const AddQuestionCard = ({ roundId, position }) => {
  const classes = useStyles();
  const [mode, setMode] = useState('start');

  if (mode === 'start') {
    return (
      <Card className={classes.card}>
        <CardActionArea
          className={classes.fullCardAction}
          onClick={() => setMode('chooseType')}
        >
          <AddCircleIcon className={classes.icon} />
        </CardActionArea>
      </Card>
    );
  }

  if (mode === 'chooseType') {
    return (
      <Card className={classes.card}>
        <IconButton
          aria-label="Previous"
          className={classes.backButton}
          onClick={() => setMode('start')}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <div className={classes.typeChoice}>
          <Typography component="h2" variant="h5">
            Choose a question type.
          </Typography>
          <div className={classes.buttonRow}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => setMode('premade')}
            >
              Premade
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => setMode('custom')}
            >
              Custom
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (mode === 'premade') {
    return (
      <PremadeQuestionsCard
        roundId={roundId}
        onBack={() => setMode('chooseType')}
        onComplete={() => setMode('start')}
      />
    );
  }

  if (mode === 'custom') {
    return (
      <CustomQuestionCard
        roundId={roundId}
        position={position}
        onComplete={() => setMode('start')}
        onBack={() => setMode('chooseType')}
      />
    );
  }

  return (
    <Card className={classes.card}>
      <AddCircleIcon className={classes.icon} />
    </Card>
  );
};

export default AddQuestionCard;
