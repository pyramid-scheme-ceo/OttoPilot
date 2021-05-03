import React from 'react';
import {Button, Chip, Grid, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {observer} from "mobx-react";
import {Api} from "../../../../models/api-models";
import {ColumnMatchType} from "../../../../models/enums";
import {useFlowFormStore} from "../../../../hooks/use-stores";
import ChevronRight from '@material-ui/icons/ChevronRight';

interface GetUniqueRowsStepFormProps {
  order: number;
}

const defaultConfiguration: Api.GetUniqueRowsStepParameters = {
  primaryDatasetName: '',
  comparisonDatasetName: '',
  outputDatasetName: '',
  comparisonColumns: [],
  columnMatchType: ColumnMatchType.Any,
}

const GetUniqueRowsStepForm = observer(({ order }: GetUniqueRowsStepFormProps) => {
  const store = useFlowFormStore();
  const configuration = store.getStepConfiguration<Api.GetUniqueRowsStepParameters>(order) || defaultConfiguration;
  
  const [primaryColumnName, setPrimaryColumnName] = React.useState<string>('');
  const [comparisonColumnName, setComparisonColumnName] = React.useState<string>('');
  
  const updatePrimaryDataset = (newPrimaryDataset: string) => {
    store.updateStepConfiguration<Api.GetUniqueRowsStepParameters>(order, {
      ...configuration,
      primaryDatasetName: newPrimaryDataset,
    });
  };

  const updateComparisonDataset = (newComparisonDataset: string) => {
    store.updateStepConfiguration<Api.GetUniqueRowsStepParameters>(order, {
      ...configuration,
      comparisonDatasetName: newComparisonDataset,
    });
  };

  const updateOutputDataset = (newOutputDataset: string) => {
    store.updateStepConfiguration<Api.GetUniqueRowsStepParameters>(order, {
      ...configuration,
      outputDatasetName: newOutputDataset,
    });
  };
  
  const updateMatchType = (newMatchType: ColumnMatchType) => {
    store.updateStepConfiguration<Api.GetUniqueRowsStepParameters>(order, {
      ...configuration,
      columnMatchType: newMatchType,
    });
  };
  
  const addColumnMapping = () => {
    if (primaryColumnName.length === 0 || comparisonColumnName.length === 0) {
      return;
    }
    
    const newComparisonColumns = configuration.comparisonColumns;
    
    newComparisonColumns.push({
      sourceColumnName: primaryColumnName,
      destinationColumnName: comparisonColumnName,
    });
    
    store.updateStepConfiguration<Api.GetUniqueRowsStepParameters>(order, {
      ...configuration,
      comparisonColumns: newComparisonColumns,
    });
    
    setPrimaryColumnName('');
    setComparisonColumnName('');
  };
  
  const deleteColumnMapping = (columnMapping: Api.ColumnMapping) => {
    const newColumnMappings = configuration.comparisonColumns.filter(c =>
      c.sourceColumnName !== columnMapping.sourceColumnName && c.destinationColumnName !== columnMapping.destinationColumnName);
    
    store.updateStepConfiguration<Api.GetUniqueRowsStepParameters>(order, {
      ...configuration,
      comparisonColumns: newColumnMappings,
    });
  };
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          id={`step-${order}-primary-dataset`}
          label="Primary dataset name"
          fullWidth
          value={configuration.primaryDatasetName}
          onChange={e => updatePrimaryDataset(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id={`step-${order}-comparison-dataset`}
          label="Comparison dataset name"
          fullWidth
          value={configuration.comparisonDatasetName}
          onChange={e => updateComparisonDataset(e.target.value)}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          id={`step-${order}-output-dataset`}
          label="Output dataset name"
          fullWidth
          value={configuration.outputDatasetName}
          onChange={e => updateOutputDataset(e.target.value)}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <InputLabel>Column match type</InputLabel>
        <Select
          id={`step-${order}-match-type`}
          label="Match type"
          fullWidth
          value={configuration.columnMatchType}
          onChange={e => updateMatchType(e.target.value as ColumnMatchType)}
        >
          <MenuItem value={ColumnMatchType.All}>All</MenuItem>
          <MenuItem value={ColumnMatchType.Any}>Any</MenuItem>
        </Select>
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
            value={primaryColumnName}
            onChange={e => setPrimaryColumnName(e.target.value)}
          />
        </Grid>
        
        <Grid item xs={6} lg={3}>
          <TextField
            id={`step-${order}-column-map-comparison`}
            label={'Comparison column name'}
            fullWidth
            value={comparisonColumnName}
            onChange={e => setComparisonColumnName(e.target.value)}
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
          {configuration.comparisonColumns.map(column => (
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

export default GetUniqueRowsStepForm;