import Ember  from 'ember';
import {storageFor} from 'ember-local-storage';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  productIds: storageFor('cart'),

  products: Ember.computed('productIds.[]', function() {
    return this.get('store').query('product', {
      ids: this.get('productIds.content')
    });
  }),

  add(productId) {
    this.get('productIds').addObject(productId);
  },
  remove(productId) {
    this.get('productIds').removeObject(productId);
  },
  clear() {
    this.get('productIds').clear();
  }

});
