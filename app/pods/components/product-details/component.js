import Component from '@ember/component';
import Ember from 'ember';
const { computed, inject } = Ember;

export default Component.extend({
  classNames: ['product-details'],
  cart: inject.service(),
  tagName: '',
  isModalOpen: false,
  cartContents: computed.alias('cart.cartContents'),

  isProductOnCart: computed('cartContents.[]','product', function() {
    return this.get('cartContents').filter((content) => {
      return content.id === this.get('product.id');
    });
  }),

  quantityAvailed: computed('isProductOnCart.[]', function() {
    return this.get('isProductOnCart.firstObject.quantity') ? this.get('isProductOnCart.firstObject.quantity') : 0;
  }),

  actions: {
    addToCart(product) {
      this.get('cart').add(product.get('id'));
    },
    removeToCart(product) {
      this.get('cart').remove(product.get('id'));
    },
    clear() {
      this.get('cart').clear();
    }
  }
});
