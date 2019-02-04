export default function() {

  this.namespace = 'api';
  this.timing = 400;

  this.get('/categories');
  this.get('/products');
  this.get('/products/:id');
  this.patch('/products/:id');
}
