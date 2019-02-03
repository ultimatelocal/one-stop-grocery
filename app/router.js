import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import Route from '@ember/routing/route';
import { dasherize } from '@ember/string';
import $ from 'jquery';

const Router = EmberRouter.extend({
  location: config.locationType,
  // rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', {path:'/'}, function(){
    this.route('products');
    this.route('cart');
  });
});

// Depending on the page, append an appropriate css class
Route.reopen({
  activate: function() {
    this._super();
    var cssClass = this.toCssClass();

    // You probably don't need the application class to be added to the body
    if (cssClass !== 'application') {
      $('body').addClass(cssClass);
    }
  },

  deactivate: function() {
    $('body').removeClass(this.toCssClass());
  },

  toCssClass: function() {
    return this.routeName.replace(/\./g, '-').dasherize();
  },

  // Dasherize query parameters if they are camelCase
  serializeQueryParamKey: dasherize
});

export default Router;
