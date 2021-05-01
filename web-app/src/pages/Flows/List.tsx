import React from 'react';
import FlowsTable from "../../components/flows/list/table";
import {Grid} from "@material-ui/core";

export default function List(): JSX.Element {  
  return (
    <Grid container>
      <Grid item xs={12}>
        <FlowsTable />
      </Grid>
    </Grid>
  );
};
