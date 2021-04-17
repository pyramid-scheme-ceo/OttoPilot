import { RouteDefinition } from "../models/ui-models";
import { Home } from '../pages/home';
import FlowsList from '../pages/Flows/List';
import FlowsNew from '../pages/Flows/New';

export const routes: RouteDefinition[] = [
  {
    key: 'home',
    path: '/',
    component: <Home />,
    exact: true,
  },
  {
    key: 'flows-list',
    path: '/flows',
    component: <FlowsList />,
    exact: true,
  },
  {
    key: 'flows-new',
    path: '/flows/new',
    component: <FlowsNew />,
    exact: false,
  },
];