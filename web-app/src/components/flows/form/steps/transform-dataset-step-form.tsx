import React from 'react';
import {Api} from "../../../../models/api-models";
import {useFlowFormStore} from "../../../../hooks/use-stores";
import {Button, Chip, Grid, InputLabel, TextField} from "@material-ui/core";
import ChevronRight from "@material-ui/icons/ChevronRight";
import {observer} from "mobx-react";

interface TransformDatasetStepFormProps {
  order: number;
}

const defaultConfiguration: Api.TransformDatasetStepParameters = {
  inputDatasetName: '',
  outputDatasetName: '',
  columnMappings: [],
};

const TransformDatasetStepForm = observer(({ order }: TransformDatasetStepFormProps) => {
  const store = useFlowFormStore();
  const configuration = store.getStepConfiguration<Api.TransformDatasetStepParameters>(order) || defaultConfiguration;

  const [inputColumnName, setInputColumnName] = React.useState<string>('');
  const [outputColumnName, setOutputColumnName] = React.useState<string>('');

  const updateInputDataset = (newInputDataset: string) => {
    store.updateStepConfiguration<Api.TransformDatasetStepParameters>(order, {
      ...configuration,
      inputDatasetName: newInputDataset,
    });
  };

  const updateOutputDataset = (newOutputDataset: string) => {
    store.updateStepConfiguration<Api.TransformDatasetStepParameters>(order, {
      ...configuration,
      outputDatasetName: newOutputDataset,
    });
  };

  const addColumnMapping = () => {
    if (inputColumnName.length === 0 || outputColumnName.length === 0) {
      return;
    }

    const newComparisonColumns = configuration.columnMappings;

    newComparisonColumns.push({
      sourceColumnName: inputColumnName,
      destinationColumnName: outputColumnName,
    });

    store.updateStepConfiguration<Api.TransformDatasetStepParameters>(order, {
      ...configuration,
      columnMappings: newComparisonColumns,
    });

    setInputColumnName('');
    setOutputColumnName('');
  };

  const deleteColumnMapping = (columnMapping: Api.ColumnMapping) => {
    const newColumnMappings = configuration.columnMappings.filter(c =>
      c.sourceColumnName !== columnMapping.sourceColumnName && c.destinationColumnName !== columnMapping.destinationColumnName);

    store.updateStepConfiguration<Api.TransformDatasetStepParameters>(order, {
      ...configuration,
      columnMappings: newColumnMappings,
    });
  };
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          id={`step-${order}-primary-dataset`}
          label="Primary dataset name"
          fullWidth
          value={configuration.inputDatasetName}
          onChange={e => updateInputDataset(e.target.value)}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          id={`step-${order}-comparison-dataset`}
          label="Comparison dataset name"
          fullWidth
          value={configuration.outputDatasetName}
          onChange={e => updateOutputDataset(e.target.value)}
        />
      </Grid>

      <Grid container item xs={12} spacing={2} style={{ marginTop: '1em' }} alignItems={'center'}>
        <Grid item xs={12}>
          <InputLabel>Comparison column mappings (primary dataset column/comparison dataset column)</InputLabel>
        </Grid>
        <Grid item xs={6} lg={3}>
          <TextField
            id={`step-${order}-column-map-primary`}
            label={'Primary column name'}
            fullWidth
            value={inputColumnName}
            onChange={e => setInputColumnName(e.target.value)}
          />
        </Grid>

        <Grid item xs={6} lg={3}>
          <TextField
            id={`step-${order}-column-map-comparison`}
            label={'Comparison column name'}
            fullWidth
            value={outputColumnName}
            onChange={e => setOutputColumnName(e.target.value)}
          />
        </Grid>

        <Grid item xs={2}>
          <Button
            variant="contained"
            endIcon={<ChevronRight />}
            onClick={() => addColumnMapping()}
          >
            Add
          </Button>
        </Grid>

        <Grid item xs={4}>
          {configuration.columnMappings.map(column => (
            <Chip
              key={`${column.sourceColumnName}-${column.destinationColumnName}`}
              label={`${column.sourceColumnName} / ${column.destinationColumnName}`}
              onDelete={() => deleteColumnMapping(column)}
              color="primary"
              style={{ margin: '0.2em' }}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
});

export default TransformDatasetStepForm;