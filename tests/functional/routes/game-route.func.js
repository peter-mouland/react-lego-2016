import { React, mount, expect } from '../../support/test.helper';
import Root, { history } from '../../../src/app/Root';
import { routes } from '../../../src/app/routes';
import styles from '../../../src/app/Layouts/mainLayout.scss';

describe('Game Route', function () {

  before(() => {
    this.wrapper = mount(<Root />);
    history.push('/game/');
  });

  after(() => {
    this.wrapper.unmount();
  });

  describe(`should contain  markup`, () => {
    it(`should contain the Game container`, () => {
      expect(this.wrapper.find('#game')).to.be.present();
    });

    it(`should contain the 'main' layout`, () => {
      expect(this.wrapper.find(`.${styles.container}`)).to.be.present();
      expect(this.wrapper.find(`.${styles.nav}`)).to.be.present();
      expect(this.wrapper.find(`.${styles.content}`)).to.be.present();
      expect(this.wrapper.find(`.${styles.footer}`)).to.be.present();
    });

    it('Should contain a title', () => {
      expect(document.title).to.equal(routes.game.title);
    });

    it('should have a nav', () => {
      expect(this.wrapper.find('nav')).to.be.present();
    });

    it('should have a footer', () => {
      expect(this.wrapper.find('footer')).to.be.present();
    });

  });
});
