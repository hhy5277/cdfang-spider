import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import PastYear from './containers/PastYear';
import CurrentYear from './containers/CurrentYear';
import Home from './containers/Home';

interface Iroutes {
  path: string;
  exact?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;
}

const routes: Iroutes[] = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/2019',
    component: CurrentYear
  },
  {
    path: '/2018',
    component: PastYear
  },
  {
    path: '/2017',
    component: PastYear
  }
];

function RouteWithSubRoutes(route: Iroutes) {
  return (
    <Route
      path={route.path}
      render={props => {
        // 中间组件，防止router配置2个相同的compoment，切换时不会渲染。
        function NOOP() {
          return <route.component {...props} />;
        }
        return <NOOP />;
      }}
    />
  );
}

function renderRouters() {
  return (
    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={route.path} {...route} />
      ))}
    </Switch>
  );
}

export default renderRouters;
