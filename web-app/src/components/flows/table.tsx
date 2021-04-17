import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { getAllFlows } from "./flows.service";
import { makeStyles } from "@material-ui/core/styles";
import { Api } from "../../models/api-models";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function FlowsTable() {
  const classes = useStyles();
  const [flows, setFlows] = React.useState<Api.Flow[]>([]);

  React.useEffect(() => {
    getAllFlows().then(result => setFlows(result));
  }, []);
  
  return (
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell align="left">Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {flows.map((flow) => (
          <TableRow key={flow.id}>
            <TableCell component="th" scope="row">{flow.id}</TableCell>
            <TableCell component="th" align="left">{flow.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}