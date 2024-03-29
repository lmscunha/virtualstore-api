import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import IProductDTO from '../dtos/IProductDTO';
import Product from '../infra/databases/entities/Product';
import IProductsProvider from '../providers/IProductsProvider';

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productRepository: IProductsProvider,
  ) {}

  public async execute(productNewData: IProductDTO): Promise<Product> {
    const product = await this.productRepository.findProductById(
      productNewData.id,
    );

    switch (product) {
      case null:
        throw new AppError('Produto não encontrado', 404);
      case undefined:
        throw new AppError('Produto não encontrado', 404);
      default:
    }

    if (productNewData.name) {
      product.name = productNewData.name;
    }

    if (productNewData.tags === undefined) {
      product.tags;
    } else if (productNewData.tags.length) {
      product.tags = productNewData.tags;
    }

    if (productNewData.description) {
      product.description = productNewData.description;
    }

    if (productNewData.image) {
      product.image = productNewData.image;
    }

    if (productNewData.price) {
      const priceFormatted = Number(productNewData.price.toFixed(2));
      product.price = priceFormatted;
    }

    if (productNewData.quantity) {
      product.quantity = productNewData.quantity;
    }

    const productUpdated = await this.productRepository.updateProduct(product);

    switch (productUpdated) {
      case null:
        throw new AppError('Produto não foi identificado', 400);
      default:
    }

    return productUpdated;
  }
}

export default UpdateProductService;
