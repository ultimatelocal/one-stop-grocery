import Ember from 'ember';

export function isFloat(params) {
  return (Number(params[0]) === params[0] && params[0] % 1 !== 0) ? `£ ${parseFloat(params[0]).toFixed(2)}`: `£ ${parseFloat(params[0]).toFixed(2)}`;
}

export default Ember.Helper.helper(isFloat);
