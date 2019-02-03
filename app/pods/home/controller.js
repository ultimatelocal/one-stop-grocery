import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
  // cart: Ember.inject.service(),
  products: Ember.computed.alias('model')
});
