import Controller from '@ember/controller';
import { filter } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Controller.extend({
  queryParams: ['categoryId'],
  products: computed.alias('model.products'),
  categories: computed.alias('model.categories'),
  selectedCategoryId: null,

  filteredProductsByCategory: computed("products.category", function() {
    if (this.get('selectedCategoryId')) {
      return this.get('products').filter((product) => {
        return product.get('category.id') === this.get("selectedCategoryId");
      })
    } else {
      return this.get('products');
    }
  }),

  actions: {
    filterByCategory(categoryId = null){
      this.transitionToRoute('home.products', {queryParams :{ categoryId }});
    },
  }
});
