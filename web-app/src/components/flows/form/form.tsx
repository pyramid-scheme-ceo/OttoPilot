﻿import React from 'react';
import {Button, Grid, TextField} from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import {useFormStore} from "./form.store";
import {observer} from "mobx-react";
import StepModal from "./step-modal";
import Step from './step';

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
        <Grid item xs={8}>
          <TextField
            id="name"
            label="Name"
            fullWidth
            value={store.flowModel.name}
            onChange={e => store.setFlow({ ...store.flowModel, name: e.target.value })}
          />
        </Grid>
        <Grid container item xs={4} justify="flex-end">
          <Button variant="contained" onClick={() => store.saveCurrentFlow()}>
            Save
          </Button>
          {!!props.flowId && <Button variant="contained" onClick={() => store.runFlow(props.flowId!)}>
              Run
          </Button>}
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