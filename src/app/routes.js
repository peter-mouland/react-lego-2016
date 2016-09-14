import React from 'react';
import { Match, Link, Miss } from 'react-router';
import DocumentMeta from 'react-document-meta';
import debug from 'debug';

import MainLayout from './Layouts/MainLayout';
import Homepage from './containers/Homepage/Homepage';
import Game from './containers/Game/Game';
import NotFound from './containers/NotFound/NotFound';

debug('lego:routes');

const siteTitle = 'React Lego';

export const routes = {
  homepage: {
    exactly: true,
    pattern: '/',
    label: 'About React Lego',
    title: `${siteTitle} - About React Lego`,
    component: Homepage
  },
  game: {
    pattern: '/game/',
    label: 'Star Wars Trivia',
    title: `${siteTitle} - Star Wars Trivia`,
    component: Game
  }
};

export const LinkHelper = ({ to, ...props }) => {
  if (!routes[to]) throw new Error(`Route to '${to}' not found`);
  return (
    <Link to={ routes[to].pattern } { ...props }>
      { props.children || routes[to].label }
    </Link>
  );
};

const passPropsToRoute = ({ route, props }) => (
  <span>
    <DocumentMeta title={ route.title } />
    <route.component {...props} routes={route.routes}/>
  </span>
);

const matchWithSubRoutes = (key, i) => {
  const route = routes[key];
  return (<Match { ...route } key={ i } render={(props) => passPropsToRoute({ route, props })} />);
};

export function makeRoutes() {
  return (
    <MainLayout>
      {Object.keys(routes).map(matchWithSubRoutes)}
      <Miss title={`${siteTitle} - Page Not Found`} component={ NotFound } />
    </MainLayout>
  );
}
