import React from 'react';
import {Button, Grid, TextField} from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import {useFormStore} from "./form.store";
import {observer} from "mobx-react";
import StepModal from "./step-modal";
import Step from './step';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Check from '@material-ui/icons/Check';
import Delete from '@material-ui/icons/Delete';

interface FlowFormProps {
  flowId?: number;
}

const FlowForm = observer((props: FlowFormProps) => {
  const store = useFormStore();
  
  React.useEffect(() => {
    if (!!props.flowId) {
      store.loadFlowForEdit(props.flowId);
    }
  }, [props.flowId]);
  
  if (store.loading) {
    return <></>;
  }
  
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} xl={8}>
          <TextField
            id="flow-name"
            label="Name"
            fullWidth
            value={store.flowModel.name}
            onChange={e => store.setFlow({ ...store.flowModel, name: e.target.value })}
          />
        </Grid>
        <Grid container item xs={12} xl={4} justify="flex-end">
          {!!props.flowId && (
            <Button
              variant="contained"
              startIcon={<PlayArrow />}
              style={{ margin: '0 0.5em' }}
              onClick={() => store.runFlow(props.flowId!)}>
                Run
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            startIcon={<Check />}
            style={{ margin: '0 0.5em' }}
            onClick={() => store.saveCurrentFlow()}>
            Save
          </Button>
          {!!props.flowId && (
            <Button
              variant="contained"
              color="secondary"
              style={{ margin: '0 0.5em' }}
              startIcon={<Delete />}
              onClick={() => store.deleteFlow(props.flowId!)}
            >
              Delete
            </Button>
          )}
        </Grid>
        
        {store.flowModel.steps.map(step => (
          <Grid item xs={12} key={step.order}>
            <Step stepType={step.stepType} order={step.order} />
          </Grid>
        ))}

        <Grid container item xs={12} justify="center">
          <Button variant="contained" color="primary" onClick={() => store.showStepModal()}>
            Add step
            <Add />
          </Button>
        </Grid>
      </Grid>
      
      <StepModal />
    </>
  );
});

export default FlowForm;