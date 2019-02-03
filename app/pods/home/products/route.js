import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  queryParams: {
    categoryId: {
      refreshModel: true
    }
  },

  model() {
    return hash({
      products: this.store.query('product',{include: 'category'}),
      categories: this.store.findAll('category')
    });
  },
  setupController(controller, model) {
    this._super(controller, model);

    const {categoryId} = this.paramsFor('home.products');
    if (categoryId) {
      controller.set('selectedCategoryId', categoryId);
    } else {
      controller.set('selectedCategoryId', null);
    }

  }
});
