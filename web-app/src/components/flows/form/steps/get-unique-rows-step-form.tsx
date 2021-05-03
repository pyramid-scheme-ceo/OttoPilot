import React from 'react';
import {Grid, TextField} from "@material-ui/core";

interface GetUniqueRowsStepFormProps {
  order: number;
}

const GetUniqueRowsStepForm = ({ order }: GetUniqueRowsStepFormProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          id="file-name"
          label="Filename"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="output-dataset-name"
          label="Output dataset name"
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default GetUniqueRowsStepForm;