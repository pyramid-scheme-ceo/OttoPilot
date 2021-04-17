export interface LinkDefinition {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
  children: LinkDefinition[];
}

export interface RouteDefinition {
  key: string;
  path: string;
  component: JSX.Element;
}