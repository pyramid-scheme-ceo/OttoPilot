import React from 'react';
import FlowForm from "../../components/flows/form/form";
import { useParams } from 'react-router-dom';
import {Grid} from "@material-ui/core";

interface PageParams {
  id: string;
}

export default function Edit(): JSX.Element {
  const { id } = useParams<PageParams>();

  return (
    <Grid container>
      <Grid item xs={12}>
        <h1>Editing flow</h1>
      </Grid>

      <Grid item xs={12} lg={8}>
        <FlowForm flowId={parseInt(id)} />
      </Grid>
    </Grid>
);
}