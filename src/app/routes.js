import Preact, { h } from 'preact';
import { Router  } from 'preact-router';
import debug from 'debug';

import MainLayout from './Layouts/MainLayout';
import Homepage from './containers/Homepage/Homepage';
import Game from './containers/Game/Game';
import NotFound from './containers/NotFound/NotFound';

debug('lego:routes');

const siteTitle = 'React Lego';

export const routes = {
  homepage: {
    path: '/',
    label: 'About React Lego',
    title: `${siteTitle} - About React Lego`,
  },
  game: {
    path: '/game/',
    label: 'Star Wars Trivia',
    title: `${siteTitle} - Star Wars Trivia`,
  }
};

export const LinkHelper = ({ to, ...props }) => {
  if (!routes[to]) throw new Error(`Route to '${to}' not found`);
  return (
    <a href={ routes[to].path } { ...props }>
      { props.children || routes[to].label }
    </a>
  );
};

export function makeRoutes() {
  return (
    <MainLayout >
      <Router>
        <Homepage { ...routes.homepage } />
        <Game { ...routes.game } />
        <NotFound default title ={`${siteTitle} - Page Not Found`} />
      </Router>
    </MainLayout>
  );
}
