import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import Radium from 'radium';

import { findRoute } from '../utils';
import { routes, LinkHelper } from '../routes';
import * as styles from './mainLayout.css';

class MainLayout extends Component {

  static propTypes = {
    location: PropTypes.object
  };

  render() {
    const { children, location } = this.props;
    const cfg = findRoute(location.pathname);
    const route = cfg || routes.homepage;
    const navLinkProps = {
      style: styles.navLink
    };

    return (
      <div style={styles.layout}>
        <DocumentMeta title={ route.title } />
        <nav style={styles.nav}>
          <span style={styles.navHeader}>React Lego</span>
          <LinkHelper to='homepage' { ...navLinkProps } />
          <LinkHelper to="game" { ...navLinkProps } />
        </nav>
        <div style={{ ...styles.content }}>
          {children}
        </div>
        <footer style={styles.footer}>
          Hosted at <a href="http://github.com/peter-mouland/react-lego">github.com/peter-mouland/react-lego</a>
        </footer>
      </div>
    );
  }
}

export default Radium(MainLayout); // eslint-disable-line new-cap
