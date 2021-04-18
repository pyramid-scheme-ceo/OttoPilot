import React from 'react';
import FlowForm from "../../components/flows/form";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  formContainer: {
    width: '50%',
  },
});

export default function New(): JSX.Element {
  const classes = useStyles();
  
  return (
    <>
      <h1>New flow</h1>
      
      <div className={classes.formContainer}>
        <FlowForm />
      </div>
    </>
  );
}