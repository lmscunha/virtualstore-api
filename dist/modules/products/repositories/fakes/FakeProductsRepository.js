"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ProductSchema = _interopRequireDefault(require("../../infra/databases/mongoose/schemas/ProductSchema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeProductsRepository {
  constructor() {
    this.products = [];
  }

  async findById(id) {
    const productId = this.products.find(product => product.id === id);
    return productId;
  }

  async checkName(newProductName) {
    const notAvailableName = this.products.find(product => product.name === newProductName);

    if (!notAvailableName) {
      return true;
    }

    return false;
  }

  async save(productData) {
    const product = new _ProductSchema.default(productData);
    Object.assign(product, productData);
    this.products.push(product);
    return product;
  }

  async update(newProductData) {
    this.products.map(product => newProductData === product);
    return Object.assign(newProductData);
  }

  async delete(productToDelete) {
    const findProduct = this.products.map(product => productToDelete.id === product.id);

    if (findProduct) {
      this.products.splice(0, 1);
    }
  }

}

var _default = FakeProductsRepository;
exports.default = _default;