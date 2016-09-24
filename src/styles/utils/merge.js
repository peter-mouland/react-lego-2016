/* eslint-disable */
export default function merge() {
  const res = {};
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i]) {
      Object.assign(res, arguments[i]);
    }
  }
  return res;
}
