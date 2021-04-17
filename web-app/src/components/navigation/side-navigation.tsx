import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { LinkDefinition } from '../../models/ui-models';
import logo from '../../assets/images/ottopilot.png';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  logo: {
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

interface SideNavigationProps {
  links: LinkDefinition[];
}

const SideNavigation = (props: SideNavigationProps): JSX.Element => {
  const classes = useStyles();
  const [expandedKey, setExpandedKey] = React.useState<string>('');

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <img
        alt="OttoPilot logo"
        className={classes.logo}
        src={logo}
      />
      <List component="nav">
        {RenderLinks(props.links, expandedKey, setExpandedKey)}
      </List>
    </Drawer>
  );
};

/**
 * Recursively renders the routes and any children within a collapsible menu item
 * @param routes The routes to render
 * @param expandedKey The key of the currently expanded menu item
 * @param setExpandedKey The function to set the currently expanded menu item
 */
function RenderLinks(routes: LinkDefinition[], expandedKey: string, setExpandedKey: React.Dispatch<React.SetStateAction<string>>): JSX.Element {
  return <>
    {routes.map(r => (
      r.children.length > 0 ? (
        <React.Fragment key={r.key}>
          <ListItem button onClick={() => setExpandedKey(expandedKey === r.key ? '' : r.key)}>
            <ListItemIcon>
              {r.icon}
            </ListItemIcon>
            <ListItemText primary={r.label} />
            {expandedKey === r.key ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={r.key === expandedKey} timeout="auto" unmountOnExit>
            {RenderLinks(r.children, expandedKey, setExpandedKey)}
          </Collapse>
        </React.Fragment>
      ) : (
        <ListItem button component="a" href={r.href} key={r.key}>
          <ListItemIcon>
            {r.icon}
          </ListItemIcon>
          <ListItemText primary={r.label} />
        </ListItem>
      )
    ))}
  </>  
}

export { SideNavigation };