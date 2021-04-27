import React from 'react';
import {StepType} from "../../../models/enums";
import {
  Accordion, AccordionDetails, AccordionSummary,
  Grid,
  IconButton,
  TextField,
  Typography
} from "@material-ui/core";
import {useFormStore} from "./form.store";
import Delete from '@material-ui/icons/Delete';
import LoadCsvStepForm from "./steps/load-csv-step-form";
import GenerateCsvStepForm from "./steps/generate-csv-step-form";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface StepProps {
  stepType: StepType;
  order: number
}

const getStepTitle = (stepType: StepType): string => {
  switch (stepType) {
    case StepType.LoadCsv: return 'Load CSV';
    case StepType.TransformFile: return 'Transform Dataset';
    case StepType.GenerateCsv: return 'Generate CSV';
    default: return '';
  }
};

const getStepForm = (stepType: StepType, order: number): JSX.Element => {
  switch (stepType) {
    case StepType.LoadCsv: return <LoadCsvStepForm order={order} />;
    case StepType.GenerateCsv: return <GenerateCsvStepForm order={order} />;
    default: throw new Error("Unexpected step type");
  }
};

const Step = ({ stepType, order }: StepProps) => {
  const store = useFormStore();
  
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${order}-content`}
        id={`panel-${order}`}
      >
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Typography>
              {order + 1}.{' '}{getStepTitle(stepType)}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={() => store.deleteStep(order)}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item xs={8} style={{ paddingTop: 0 }}>
            <TextField
              id={`step-name-${order}`}
              label="Name"
              value={store.flowModel.steps[order].name}
              onChange={e => store.updateStep(order, { ...store.flowModel.steps[order], name: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            {getStepForm(stepType, order)}
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default Step;