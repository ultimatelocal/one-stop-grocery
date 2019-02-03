import Service from '@ember/service';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { storageFor } from 'ember-local-storage';

export default Service.extend({
  store: inject.service(),
  productIds: storageFor('cart'),

  products: computed('productIds.[]', function() {
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
