export default function() {

  this.namespace = 'api';
  this.timing = 400;

  this.get('/categories');
  this.get('/products');
  this.get('/products/:id', (schema, request) => {
    let idParams = request.params.id;
    let ids = idParams.includes(',') ? idParams.split(',') : idParams;

    let products = schema.products.find(ids);

    if (products.length > 1) {
      return {
        data: products.models.map(product => (
          {type: 'products',id: product.id, attributes: product}))
      };
    } else {
      return {
        data: {
          type: 'products',
          id: ids,
          attributes: products
        }
      };
    }


  });
}
