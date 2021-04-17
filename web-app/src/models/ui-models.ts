export interface Route {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
  children: Route[];
}