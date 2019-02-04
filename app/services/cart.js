import Service from '@ember/service';
import Ember from 'ember';
import { computed } from '@ember/object';
import { storageFor } from 'ember-local-storage';
import { observer } from '@ember/object';

export default Service.extend({
  store: Ember.inject.service('store'),
  coupon: storageFor('coupon'),
  cartContents: storageFor('cart'),
  isCartHasContents: computed.gt('cartContents.length', 0),
  productPrices: computed.mapBy('cartContents', 'total'),
  grandTotal: computed.sum('productPrices'),

  couponObserver: observer('cartContents.[]', function(){
    if(this.get('isCartHasContents') < 1) {
      this.removeCoupon();
    }
  }),
  isThereCouponApplied:computed.gt('coupon.length', 0),

  tenPercentDrinks: computed('cartContents.[]', function(){
    return this.get('cartContents').filter((item) => {
      return parseInt(item.categoryId) === 3;
    });
  }),

  drinksPrices: computed.mapBy('tenPercentDrinks', 'total'),
  drinksProductTotal: computed.sum('drinksPrices'),
  isDrinksPromoMeet: computed.gte('tenPercentDrinks.length', 10),

  fiftyOffBakingProducts: computed('cartContents.[]', 'grandTotal', function(){
    return this.get('cartContents').filter((item) => {
      return parseInt(item.categoryId) === 5;
    });
  }),

  fiftyOffBakingPrices: computed.mapBy('fiftyOffBakingProducts', 'total'),
  bakingProductsTotal: computed.sum('fiftyOffBakingPrices'),
  isBakingPromoMeet: computed.gte('bakingProductsTotal', 50),

  totalDiscountedPrice: computed('tenPercentDrinks.[]', 'fiftyOffBakingProducts.[]','bakingProductsTotal','coupon.[]', function() {
    let discountOnBakingProducts = 0;
    let discountOnDrinks = 0;
    let discountedTotal = 0;
    let discountOnCouponApplied = 0;

    if (this.get('isBakingPromoMeet')) {
      discountOnBakingProducts = 50;
    }

    if (this.get('isDrinksPromoMeet')) {
      discountOnDrinks = this.get('drinksProductTotal') * 0.1;
    }

    if (this.get('isThereCouponApplied')) {
      let coupon = this.get('coupon');
      discountOnCouponApplied = coupon.get('firstObject.discount');
    }
    discountedTotal = parseFloat(this.get('grandTotal')) - (parseFloat(discountOnBakingProducts) + parseFloat(discountOnDrinks) + parseFloat(discountOnCouponApplied));
    return discountedTotal >= 0 ? discountedTotal.toFixed(2) : 0;
  }),

  isItemExistsOnCart(product) {
    return this.get('cartContents').filter((item) => {
      return item.id === product.get('id');
    });
  },

  add(productId) {
    this.get('store').findRecord('product', productId, {include:'category'}).then((product) => {

      let itemSelected = {
        id: product.get('id'),
        product: product,
        total: product.get('price'),
        quantity:1,
        categoryId: product.get('category.id')
      };

      if (this.get('isCartHasContents')) {
        if (this.isItemExistsOnCart(product).length > 0) {
          this.updateQuantity(product, "increment", false);
        } else {
          this.get('cartContents').addObject(itemSelected);
          this.updateQuantity(product, "increment", true);
        }
      } else {
        this.get('cartContents').addObject(itemSelected);
        this.updateQuantity(product, "increment", true);
      }
    });
  },

  updateQuantity(product, type, isFirstItem) {
    let itemQuantityUpdated,itemQuantityRecordUpdated;
    if (this.get('isCartHasContents')) {
      this.get('cartContents').map((item) => {
        if (item.id === product.get('id')) {

          if (type === "increment") {
            itemQuantityUpdated = isFirstItem ? parseInt(item.quantity) : (parseInt(item.quantity) + 1);
            itemQuantityRecordUpdated = parseInt(product.get('origQuantityAvailable')) - itemQuantityUpdated;
          } else if (type === "decrement") {
            itemQuantityUpdated = parseInt(item.quantity) - 1;
            itemQuantityRecordUpdated = parseInt(product.get('origQuantityAvailable')) + itemQuantityUpdated;

            //hot fix for non persisted data because of mirage
            if (itemQuantityRecordUpdated > parseInt(product.get('origQuantityAvailable'))) {
              itemQuantityRecordUpdated = parseInt(product.get('origQuantityAvailable')) - 1;
            }
          }
          if (itemQuantityUpdated > 0) {
            //modify cart item then reinsert to array
            let modifiedOrder = {
               id: item.id,
               product: item.product,
               total: item.product.price * itemQuantityUpdated,
               quantity: itemQuantityUpdated,
               categoryId: item.categoryId
             };

             if (itemQuantityRecordUpdated < product.get('origQuantityAvailable') && itemQuantityRecordUpdated >= 0) {
               product.set('quantityAvailable', itemQuantityRecordUpdated);
               product.save();
               this.get('cartContents').removeObject(item);
               this.get('cartContents').addObject(modifiedOrder);
             }

          } else {
            //if quantity is zero remove the item on the cart array
            this.get('cartContents').removeObject(item);
          }
        }
      });
    }
  },

  applyCouponCode(couponCode){
    this.get('coupon').addObject({couponCode: couponCode, discount: 20});
  },
  removeCoupon(){
    this.get('coupon').clear();
  },

  remove(productId) {
    if (this.get('isCartHasContents')) {
      this.get('store').findRecord('product', productId, {include: 'category'}).then((product) => {
        this.updateQuantity(product, "decrement", false);
      });
    }
  },

  clear() {
    this.get('cartContents').clear();
    this.get('coupon').clear();
  }

});
