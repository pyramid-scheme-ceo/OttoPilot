import React from 'react';
import {useFormStore} from "../form.store";
import {Grid, TextField, Typography} from "@material-ui/core";
import {Api} from "../../../../models/api-models";

interface LoadCsvStepForm {
  order: number;
}

const LoadCsvStepForm = ({ order }: LoadCsvStepForm) => {
  const store = useFormStore();
  
  let initialFileName = '';
  let initialDatasetName = '';
  
  if (store.steps[order].serialisedParameters.length > 0) {
    const initialData = JSON.parse(store.steps[order].serialisedParameters) as Api.LoadCsvStepParameters;
    
    initialFileName = initialData.fileName;
    initialDatasetName = initialData.outputDatasetName;
  }
  
  const [fileName, setFileName] = React.useState<string>(initialFileName);
  const [outputDatasetName, setOutputDatasetName] = React.useState<string>(initialDatasetName);
  
  const updateFileName = (newValue: string) => {
    setFileName(newValue);
    store.updateStepConfiguration<Api.LoadCsvStepParameters>(order, {
      fileName: newValue,
      outputDatasetName,
    });
  };
  
  const updateOutputDatasetName = (newValue: string) => {
    setOutputDatasetName(newValue);
    store.updateStepConfiguration<Api.LoadCsvStepParameters>(order, {
      fileName,
      outputDatasetName: newValue
    });
  };
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>
          Step configuration
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="file-name"
          label="Filename"
          fullWidth
          onChange={e => updateFileName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="output-dataset-name"
          label="Output dataset name"
          fullWidth
          onChange={e => updateOutputDatasetName(e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default LoadCsvStepForm;