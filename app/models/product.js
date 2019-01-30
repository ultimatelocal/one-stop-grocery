import DS from 'ember-data';

export default DS.Model.extend({
  category: DS.belongsTo('category', {async: true}),

  name:              DS.attr('string'),
  price:             DS.attr('number'),
  markDownPrice:     DS.attr('number'),
  quantityAvailable: DS.attr('number'),

});
