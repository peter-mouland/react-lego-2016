import debug from 'debug';

const log = debug('lego:server-logger');

export default function logger() {
  return function* genLogger(next) {
    const start = new Date();
    yield next;
    const ms = new Date() - start;
    log(`${this.method} ${this.originalUrl} ${this.status} ${ms}ms`);
  };
}
