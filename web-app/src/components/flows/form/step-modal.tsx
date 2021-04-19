import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography
} from "@material-ui/core";
import {useFormStore} from "./form.store";
import {observer} from "mobx-react";
import {makeStyles} from "@material-ui/core/styles";
import Add from '@material-ui/icons/Add';
import {StepType} from "../../../models/enums";

interface StepOption {
  stepType: StepType;
  name: string;
  description: string;
}

const stepOptions: StepOption[] = [
  {
    stepType: StepType.LoadCsv,
    name: 'Load CSV',
    description: 'Fetches a CSV file and loads it as a dataset into your flow so it can be used by later steps',
  },
  {
    stepType: StepType.TransformFile,
    name: 'Transform Dataset',
    description: 'Transforms a dataset to a new dataset with a different column arrangement',
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
    margin: '0.5em',
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
            <Grid container xs={2} justify="center" alignItems="center">
              <Grid item>
                <IconButton onClick={() => store.addStepAndHideModal(s.stepType)}>
                  <Add />
                </IconButton>
              </Grid>
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