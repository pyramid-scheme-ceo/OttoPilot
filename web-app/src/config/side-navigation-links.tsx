import {LinkDefinition} from "../models/ui-models";
import Home from "@material-ui/icons/Home";
import DoubleArrow from "@material-ui/icons/DoubleArrow";
import List from "@material-ui/icons/List";
import Add from "@material-ui/icons/Add";
import React from "react";

export const sideNavigationLinks: LinkDefinition[] = [
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
];