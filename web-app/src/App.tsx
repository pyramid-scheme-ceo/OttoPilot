import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { SideNavigation } from "./components/navigation";
import Home from '@material-ui/icons/Home';
import DoubleArrow from '@material-ui/icons/DoubleArrow';
import List from '@material-ui/icons/List';
import Add from '@material-ui/icons/Add';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
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
    <div className="App">
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      
      <SideNavigation routes={[
        {
          key: 'home',
          label: 'Home',
          href: '/',
          icon: <Home />,
          children: []
        },
        {
          key: 'flows',
          label: 'Flows',
          href: '',
          icon: <DoubleArrow />,
          children: [
            {
              key: 'list',
              label: 'List',
              href: '/flows',
              icon: <List />,
              children: []
            },
            {
              key: 'new',
              label: 'New',
              href: '/flows/new',
              icon: <Add />,
              children: []
            }
          ]
        }
      ]} />
    </div>
  );
}

export default App;
