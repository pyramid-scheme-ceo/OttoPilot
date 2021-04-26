import React from 'react';
import {StepType} from "../../../models/enums";
import {Card, CardActionArea, CardContent, CardHeader, IconButton, TextField, Typography} from "@material-ui/core";
import {useFormStore} from "./form.store";
import Delete from '@material-ui/icons/Delete';
import LoadCsvStepForm from "./steps/load-csv-step-form";

interface StepProps {
  stepType: StepType;
  order: number
}

const getStepTitle = (stepType: StepType): string => {
  switch (stepType) {
    case StepType.LoadCsv: return 'Load CSV';
    case StepType.TransformFile: return 'Transform Dataset';
    default: return '';
  }
};

const getStepForm = (stepType: StepType, order: number): JSX.Element => {
  switch (stepType) {
    case StepType.LoadCsv: return <LoadCsvStepForm order={order} />;
    default: throw new Error("Unexpected step type");
  }
};

const Step = ({ stepType, order }: StepProps) => {
  const store = useFormStore();
  
  return (
    <Card>
      <CardHeader
        title={
          <TextField
            id="name"
            label="Name"
            value={store.flowModel.steps[order].name}
            onChange={e => store.updateStep(order, { ...store.flowModel.steps[order], name: e.target.value })}
          />
        }
        subheader={
          <Typography color="textSecondary" style={{ fontSize: 14, marginTop: '1em' }}>
            {getStepTitle(stepType)}            
          </Typography>
        }
        action={
          <IconButton onClick={() => store.deleteStep(order)}>
            <Delete />
          </IconButton>
        }
      />
      <CardActionArea>
        <CardContent>
          {getStepForm(stepType, order)}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Step;