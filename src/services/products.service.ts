import connection from '../models/connection';
import ProductModel from '../models/products.model';
import Product from '../interfaces/product.interface';

class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async createNewProduct(product: Product): Promise<Product> {
    const data = await this.model.createNewProduct(product);
    return data;
  }
}

export default ProductService;