import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {makeStyles} from "@material-ui/core/styles";
import {LinearProgress} from "@material-ui/core";
import {useRootStore} from "../../hooks/use-stores";
import {observer} from "mobx-react";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
}));

const SharedToolbar = observer((): JSX.Element => {
  const classes = useStyles();
  const store = useRootStore();
  
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar />
      {store.loading && <LinearProgress />}
    </AppBar>
  )
});

export { SharedToolbar };