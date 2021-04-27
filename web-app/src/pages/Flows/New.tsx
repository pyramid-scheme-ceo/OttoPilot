import React from 'react';
import FlowForm from "../../components/flows/form/form";
import {Grid} from "@material-ui/core";

export default function New(): JSX.Element {
  return (
    <Grid container>
      <Grid item xs={12}>
        <h1>Editing flow</h1>
      </Grid>

      <Grid item xs={8}>
        <FlowForm />
      </Grid>
    </Grid>
  );
}