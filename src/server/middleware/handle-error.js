import debug from 'debug';

const log = debug('lego:handleError.js');

export default function errorHandler(renderer) {
  return function* genErrorHandler(next) {
    try {
      yield next; // pass on the execution to downstream middlewares
    } catch (err) {
      if (process.env.NODE_ENV === 'production') {
        log(err); // send to real logging system
      } else {
        log(err);
      }
      this.response.status = err.status || 500;
      if (renderer) {
        this.type = 'html';
        this.body = this[renderer](err);
      } else {
        this.type = 'json';
        this.body = { error: err };
      }
      this.app.emit('error', err, this);
    }
  };
}
