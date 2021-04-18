import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Grid, IconButton,
  Typography
} from "@material-ui/core";
import {useFormStore} from "./form.store";
import {observer} from "mobx-react";
import {makeStyles} from "@material-ui/core/styles";
import Add from '@material-ui/icons/Add';

interface StepOption {
  stepType: number;
  name: string;
  description: string;
}

const stepOptions: StepOption[] = [
  {
    stepType: 0,
    name: 'Load CSV',
    description: 'Fetches a CSV file and loads it as a dataset into your flow so it can be used by later steps',
  },
];

const useStyles = makeStyles({
  stepLabel: {
    fontSize: '1.5em',
  },
  stepOptionContainer: {
    border: '1px solid #dcdcdc',
    padding: '1em',
    borderRadius: '0.5em',
  },
})

const StepModal = observer(() => {
  const store = useFormStore();
  const classes = useStyles();
  
  return (
    <Dialog open={!store.stepModelHidden} onClose={() => store.hideStepModal()}>
      <DialogTitle>
        Add step
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select from one of the below steps to add it to your flow
        </DialogContentText>
        {stepOptions.map(s => (
          <Grid container className={classes.stepOptionContainer} key={s.stepType}>
            <Grid item xs={10}>
              <Typography variant="subtitle1" gutterBottom className={classes.stepLabel}>
                {s.name}
              </Typography>
              <Typography variant="body1">
                {s.description}
              </Typography>
            </Grid>
            <Grid container item xs={2} justify="center">
              <IconButton onClick={() => store.addStepAndHideModal(s.stepType)}>
                <Add />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => store.hideStepModal()}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
});

export default StepModal;