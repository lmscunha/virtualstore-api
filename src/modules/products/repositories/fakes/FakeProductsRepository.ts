import IProductDTO from '../../dtos/IProductDTO';
import { ProductSchema } from '../../databases/mongoose/schemas/ProductSchema';
import IProductEntity from '../../entities/IProductEntity';
import IProductProvider from '../../providers/IProductsProvider';
import AppError from '../../../../shared/errors/AppError';

class FakeProductsRepository implements IProductProvider {
  private products: IProductEntity[] = [];

  public async find(): Promise<IProductEntity[] | null> {
    const products = await ProductSchema.find();

    if (products === null) {
      throw new AppError('Products not found!', 404);
    }
    return products;
  }

  public async findById(id: string): Promise<IProductEntity | undefined> {
    const productId = this.products.find(product => product.id === id);

    return productId;
  }

  public async checkName(newProductName: string): Promise<boolean> {
    const notAvailableName = this.products.find(
      product => product.name === newProductName,
    );

    if (!notAvailableName) {
      return true;
    }

    return false;
  }

  public async save(productData: IProductDTO): Promise<IProductEntity> {
    const product = new ProductSchema(productData);

    Object.assign(product, productData);

    this.products.push(product);
    return product;
  }

  public async update(
    newProductData: IProductDTO,
  ): Promise<IProductEntity | null> {
    this.products.map(product => newProductData === product);

    return newProductData;
  }

  public async delete(productToDelete: IProductDTO): Promise<void | null> {
    const findProduct = this.products.map(
      product => productToDelete.id === product.id,
    );

    if (findProduct) {
      this.products.splice(0, 1);
    }
  }
}

export default FakeProductsRepository;
