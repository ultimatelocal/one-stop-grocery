import Ember from 'ember';

export function pluralizeQuantity(params) {
  let qty = parseInt(params[0]);

  return qty > 1 ? `${qty} pcs` : `${qty} pc`;

}

export default Ember.Helper.helper(pluralizeQuantity);
