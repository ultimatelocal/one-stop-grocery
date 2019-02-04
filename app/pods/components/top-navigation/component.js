import Component from '@ember/component';
const { computed, inject } = Ember;

export default Component.extend({
  classNames: ['top-navigation'],
  cart: inject.service(),
  collapsed: true,

});
