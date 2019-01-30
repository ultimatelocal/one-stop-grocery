import DS from 'ember-data';

export default DS.Model.extend({
  products: DS.hasMany('products', {async:true}),

  name: DS.attr('string')
});
