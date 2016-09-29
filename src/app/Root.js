import Preact, { h } from 'preact';
import debug from 'debug';

import { makeRoutes } from './routes';

debug('lego:Root');

export default class Root extends Preact.Component {
  render({}, {}) {
    return <div  >
      {makeRoutes()}
    </div>;
  }
}
