import React from 'react';
import FlowForm from "../../components/flows/form/form";
import {makeStyles} from "@material-ui/core/styles";
import { useParams } from 'react-router-dom';

const useStyles = makeStyles({
  formContainer: {
    width: '50%',
  },
});

interface PageParams {
  id: string;
}

export default function Edit(): JSX.Element {
  const classes = useStyles();
  const { id } = useParams<PageParams>();

  return (
    <>
      <h1>Editing flow</h1>

      <div className={classes.formContainer}>
        <FlowForm flowId={parseInt(id)} />
      </div>
    </>
);
}