"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

var _dateFnsTz = require("date-fns-tz");

var _CartSchema = _interopRequireDefault(require("../infra/databases/mongoose/schemas/CartSchema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-multi-assign */
class CartsRepository {
  async findCartByUserId(user_id) {
    const userCart = await _CartSchema.default.findOne({
      user_id
    });
    return userCart;
  }

  async findProductsByUserId(user_id) {
    const userProductsCart = await _CartSchema.default.findOne({
      user_id
    });
    return userProductsCart;
  }

  async createACart(user_id) {
    const newDate = new Date();
    const timeZone = 'America/Sao_Paulo';
    const dateWithTimeZone = (0, _dateFnsTz.utcToZonedTime)(newDate, timeZone);
    const cartCreated = new _CartSchema.default({
      user_id,
      created_at: (0, _dateFns.format)(dateWithTimeZone, "dd/MM/yyyy '-' HH'h'mm'm'ss's'")
    });
    await cartCreated.save();
  }

  async updateCartProducts(newProductsData) {
    const newDate = new Date();
    const timeZone = 'America/Sao_Paulo';
    const dateWithTimeZone = (0, _dateFnsTz.utcToZonedTime)(newDate, timeZone);
    const cartUpdated = await _CartSchema.default.findOneAndUpdate({
      user_id: newProductsData.user_id
    }, {
      $set: newProductsData,
      updated_at: (0, _dateFns.format)(dateWithTimeZone, "dd/MM/yyyy '-' HH'h'mm'm'ss's'")
    });
    return cartUpdated;
  }

  async emptyUserCart(user_id) {
    const newDate = new Date();
    const timeZone = 'America/Sao_Paulo';
    const dateWithTimeZone = (0, _dateFnsTz.utcToZonedTime)(newDate, timeZone);
    await _CartSchema.default.findOneAndUpdate({
      user_id
    }, {
      products: [],
      updated_at: (0, _dateFns.format)(dateWithTimeZone, "dd/MM/yyyy '-' HH'h'mm'm'ss's'")
    });
  }

  async deleteCart(user_id) {
    await _CartSchema.default.findOneAndDelete({
      user_id
    });
  }

}

exports.default = CartsRepository;