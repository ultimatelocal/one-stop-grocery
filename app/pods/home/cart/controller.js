import Controller from '@ember/controller';
import Ember from 'ember';
import { filter } from '@ember/object/computed';
const { computed, inject } = Ember;

export default Controller.extend({
  cart: inject.service(),
  cartContents: computed.alias('cart.cartContents'),
  couponCode: null,
  isError: false,

  actions: {
    addToCart(productId) {
      this.get('cart').add(productId);
    },
    removeToCart(productId) {
      this.get('cart').remove(productId);
    },
    clear() {
      this.get('cart').clear();
    },
    applyCoupon() {
      if (this.get('couponCode') === "20OFFPROMO") {
        this.get('cart').applyCouponCode(this.get('couponCode'));
      } else {
        this.set('isError', true);

        setTimeout(() => {
          this.set('isError', false);
        }, 2000);
      }
    },
    checkout(){
      this.get('cart').clear();
      this.transitionToRoute('home.products');
    }
  }
});
