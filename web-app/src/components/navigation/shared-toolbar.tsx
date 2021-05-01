﻿import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
}));

const SharedToolbar = (): JSX.Element => {
  const classes = useStyles();
  
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar />
    </AppBar>
  )
};

export { SharedToolbar };