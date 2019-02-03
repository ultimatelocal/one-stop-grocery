import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  namespace: 'api',
  host: window.location.origin,
  coalesceFindRequests: true,

  shouldReloadAll: function() {
    return false;
  },
  shouldBackgroundReloadRecord: function() {
    return true;
  }
});
