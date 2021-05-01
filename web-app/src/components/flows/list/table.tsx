import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {observer} from "mobx-react";
import {useFlowListStore} from "../../../hooks/use-stores";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const FlowsTable = observer(() => {
  const classes = useStyles();
  const store = useFlowListStore();

  React.useEffect(() => {
    store.fetchFlows()
  }, []);
  
  return (
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell align="left">Name</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {store.flows.map((flow) => (
          <TableRow key={flow.id}>
            <TableCell component="th" scope="row">{flow.id}</TableCell>
            <TableCell component="th" align="left">{flow.name}</TableCell>
            <TableCell component="th" align="right">
              <Button variant="contained" color="primary" href={`/flows/${flow.id}`}>
                Edit
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});

export default FlowsTable;