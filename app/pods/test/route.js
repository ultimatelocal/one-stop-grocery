const { RSVP, $ } = Ember;

export default Ember.Route.extend({
  model() {
    return this.store.query('product', {
      include:'category'
    });
  }
});
