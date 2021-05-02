import React from 'react';
import {Button, Grid, TextField} from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import {observer} from "mobx-react";
import StepModal from "./step-modal";
import Step from './step';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Check from '@material-ui/icons/Check';
import Delete from '@material-ui/icons/Delete';
import {useFlowFormStore} from "../../../hooks/use-stores";
import { useHistory } from 'react-router-dom';

interface FlowFormProps {
  flowId?: number;
}

const FlowForm = observer((props: FlowFormProps) => {
  const history = useHistory();
  const store = useFlowFormStore();
  
  React.useEffect(() => {
    if (!!props.flowId) {
      store.fetchFlow(props.flowId);
    }
  }, [props.flowId]);
  
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} xl={8}>
          <TextField
            id="flow-name"
            label="Name"
            fullWidth
            value={store.flow.name}
            onChange={e => store.setFlow({ ...store.flow, name: e.target.value })}
          />
        </Grid>
        <Grid container item xs={12} xl={4} justify="flex-end">
          {!!props.flowId && (
            <Button
              variant="contained"
              startIcon={<PlayArrow />}
              style={{ margin: '0 0.5em' }}
              onClick={() => store.startFlowRun()}>
                Run
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            startIcon={<Check />}
            style={{ margin: '0 0.5em' }}
            onClick={() => store.saveFlow(id => history.push(`/flows/${id}`))}>
            Save
          </Button>
          {!!props.flowId && (
            <Button
              variant="contained"
              color="secondary"
              style={{ margin: '0 0.5em' }}
              startIcon={<Delete />}
              onClick={() => store.deleteFlow()}
            >
              Delete
            </Button>
          )}
        </Grid>
        
        {store.flow.steps.map(step => (
          <Grid item xs={12} key={step.order}>
            <Step stepType={step.stepType} order={step.order} />
          </Grid>
        ))}

        <Grid container item xs={12} justify="center">
          <Button variant="contained" color="primary" onClick={() => store.showAddStepModal()}>
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