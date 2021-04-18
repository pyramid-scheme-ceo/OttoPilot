import React from 'react';
import {Button, Grid, TextField} from "@material-ui/core";
import Add from "@material-ui/icons/Add";

export default function FlowForm() {
  const [name, setName] = React.useState<string>('');
  
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="name"
            label="Name"
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
            error={name.length > 255}
          />
        </Grid>

        <Grid container item xs={12} justify="center">
          <Button variant="contained" color="primary">
            Add step
            <Add />
          </Button>
        </Grid>
      </Grid>
    </>
  )
}