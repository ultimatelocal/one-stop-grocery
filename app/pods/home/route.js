import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    return this.store.findRecord('product','1,2,3',{include: 'category'});
  }
});
