import React from 'react';
import {useFormStore} from "../form.store";
import {Api} from "../../../../models/api-models";
import {Grid, TextField, Typography} from "@material-ui/core";

interface GenerateCsvStepFormProps {
  order: number;
}

const GenerateCsvStepForm = ({ order }: GenerateCsvStepFormProps) => {
  const store = useFormStore();

  let initialFileName = '';
  let initialDatasetName = '';

  if (store.flowModel.steps[order].serialisedParameters.length > 0) {
    const initialData = JSON.parse(store.flowModel.steps[order].serialisedParameters) as Api.GenerateCsvStepParameters;

    initialFileName = initialData.fileName;
    initialDatasetName = initialData.datasetName;
  }

  const [fileName, setFileName] = React.useState<string>(initialFileName);
  const [datasetName, setDatasetName] = React.useState<string>(initialDatasetName);

  const updateFileName = (newValue: string) => {
    setFileName(newValue);
    store.updateStepConfiguration<Api.GenerateCsvStepParameters>(order, {
      fileName: newValue,
      datasetName,
    });
  };

  const updateDatasetName = (newValue: string) => {
    setDatasetName(newValue);
    store.updateStepConfiguration<Api.GenerateCsvStepParameters>(order, {
      fileName,
      datasetName: newValue,
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
          value={fileName}
          onChange={e => updateFileName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="dataset-name"
          label="Dataset name"
          fullWidth
          value={datasetName}
          onChange={e => updateDatasetName(e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default GenerateCsvStepForm;