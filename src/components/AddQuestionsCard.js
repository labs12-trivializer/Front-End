import React, { useState } from 'react';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles(theme => ({
  card: {
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
    color: theme.palette.text.secondary,
    fontSize: 40
  },
  cardEmpty: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}));

const AddQuestionCard = () => {
  const classes = useStyles();
  const [questionType, setQuestionType] = useState(null);
  const [typeChooserShowing, setTypeChooserShowing] = useState(false);

  if (typeChooserShowing) {
    return (
      <Card className={classes.card}>
        <AddCircleIcon className={classes.icon} />
      </Card>
    );
  }

  if (!questionType) {
    return (
      <Card className={classes.card}>
        <AddCircleIcon className={classes.icon} />
      </Card>
    );
  }
  return (
    <Card className={classes.card}>
      <AddCircleIcon className={classes.icon} />
    </Card>
  );
};

export default AddQuestionCard;
