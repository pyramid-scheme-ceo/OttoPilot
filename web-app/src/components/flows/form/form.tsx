import React from 'react';
import {Button, Grid, TextField} from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import {useFormStore} from "./form.store";
import {observer} from "mobx-react";
import StepModal from "./step-modal";

const FlowForm = observer(() => {
  const store = useFormStore();
  
  if (store.loading) {
    return <></>;
  }
  
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="name"
            label="Name"
            fullWidth
            value={store.flowModel.name}
            onChange={e => store.setFlow({ ...store.flowModel, name: e.target.value })}
          />
        </Grid>

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