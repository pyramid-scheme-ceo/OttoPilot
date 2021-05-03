import React from 'react';
import {observer} from "mobx-react";
import {useFlowFormStore} from "../../../../hooks/use-stores";
import {Chip, Grid, TextField} from "@material-ui/core";
import {Api} from "../../../../models/api-models";
import {Autocomplete} from "@material-ui/lab";

interface FindAndReplaceStepFormProps {
  order: number;
}

let defaultConfiguration: Api.FindAndReplaceStepParameters = {
  datasetName: '',
  searchText: '',
  replaceText: '',
  searchColumns: [],
};

const FindAndReplaceStepForm = observer(({ order }: FindAndReplaceStepFormProps) => {
  const store = useFlowFormStore();
  const existingConfiguration = store.getStepConfiguration<Api.FindAndReplaceStepParameters>(order);
  console.log(existingConfiguration);
  const configuration = existingConfiguration || defaultConfiguration;
   
  const updateDatasetName = (newDatasetName: string) => {
    store.updateStepConfiguration<Api.FindAndReplaceStepParameters>(order, {
      ...configuration,
      datasetName: newDatasetName,
    });
  };
  
  const updateSearchText = (newSearchText: string) => {
    store.updateStepConfiguration<Api.FindAndReplaceStepParameters>(order, {
      ...configuration,
      searchText: newSearchText,
    });
  };
  
  const updateReplaceText = (newReplaceText: string) => {
    store.updateStepConfiguration<Api.FindAndReplaceStepParameters>(order, {
      ...configuration,
      replaceText: newReplaceText,
    });
  };
  
  const updateSearchColumns = (newSearchColumns: string[]) => {
    store.updateStepConfiguration<Api.FindAndReplaceStepParameters>(order, {
      ...configuration,
      searchColumns: newSearchColumns,
    });
  };
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          id={`step-${order}-dataset-name`}
          label="Dataset name"
          fullWidth
          value={configuration.datasetName}
          onChange={e => updateDatasetName(e.target.value)}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          id={`step-${order}-search-text`}
          label="Find"
          fullWidth
          value={configuration.searchText}
          onChange={e => updateSearchText(e.target.value)}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          id={`step-${order}-replace-text`}
          label="Replace with"
          fullWidth
          value={configuration.replaceText}
          onChange={e => updateReplaceText(e.target.value)}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Autocomplete
          multiple
          id={`step-${order}-search-columns`}
          freeSolo
          renderTags={(value, getTagProps) => (
            value.map((option, index) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search columns"
            />
          )}
          value={configuration.searchColumns}
          onChange={(_: any, values: any) => updateSearchColumns(values)}
          options={[]}
        />
      </Grid>
    </Grid>
  );
});

export default FindAndReplaceStepForm;