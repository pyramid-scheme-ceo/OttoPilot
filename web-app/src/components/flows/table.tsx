import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { getAllFlows } from "./flows.service";
import { makeStyles } from "@material-ui/core/styles";

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
          <TableCell align="right">Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {flows.map((flow) => (
          <TableRow key={flow.Id}>
            <TableCell component="th" scope="row">{flow.Name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}