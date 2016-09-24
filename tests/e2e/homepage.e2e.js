import { routes } from '../../src/app/routes';
import styles from '../../src/app/Layouts/mainLayout.scss';

module.exports = {
  '@tags': ['smoke'],
  before(browser) {
    browser.pageLoaded(routes.homepage.path, 'body');
  },
  after(browser) {
    browser.end();
  },

  ['homepage layout should include nav, footer and content blocks'](browser) {
    browser.expect.element(`.${styles.container}`).to.be.present;
    browser.expect.element(`.${styles.nav}`).to.be.present;
    browser.expect.element(`.${styles.content}`).to.be.present;
    browser.expect.element(`.${styles.footer}`).to.be.present;
  },

  ['homepage can navigate to the game page'](browser) {
    browser.safeClick('[href="/game/"]');
    browser.expect.element('#game').to.be.present;
  }
};
