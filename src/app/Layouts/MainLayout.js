import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';

import { findRoute } from '../utils';
import { routes, LinkHelper } from '../routes';

import styles from './mainLayout.scss';

export default class MainLayout extends Component {

  static propTypes = {
    location: PropTypes.object
  };

  render() {
    const { children, location } = this.props;
    const cfg = findRoute(location.pathname);
    const route = cfg || routes.homepage;
    const navLinkProps = {
      className: styles.link
    };

    return (
      <div className={styles.container}>
        <DocumentMeta title={ route.title } />
        <nav className={styles.nav}>
          <span className={styles.header}>React Lego</span>
          <LinkHelper to='homepage' { ...navLinkProps } />
          <LinkHelper to="game" { ...navLinkProps } />
        </nav>
        <div className={styles.content}>
          {children}
        </div>
        <footer className={styles.footer}>
          Hosted at <a href="http://github.com/peter-mouland/react-lego">github.com/peter-mouland/react-lego</a>
        </footer>
      </div>
    );
  }
}
