import React from 'react';

import { BrowserRouter as Router, Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {SharedToolbar, SideNavigation} from "./components/navigation";
import { CssBaseline } from "@material-ui/core";
import { routes, sideNavigationLinks } from "./config";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();
    
  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <SharedToolbar />
        <SideNavigation links={sideNavigationLinks} />
        
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {routes.map(route => (
            <Route key={route.key} path={route.path} exact={route.exact}>
              {route.component}
            </Route>
          ))}
        </main>
      </div>
    </Router>
  );
}

export default App;
