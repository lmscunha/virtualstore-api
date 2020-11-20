"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _ICartProvider = _interopRequireDefault(require("../../providers/ICartProvider"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateCartService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CartsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICartProvider.default === "undefined" ? Object : _ICartProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateCartService {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  async execute(cartNewData) {
    const cartUpdated = await this.cartRepository.updateCartProducts(cartNewData);

    switch (cartUpdated) {
      case null:
        throw new _AppError.default('Carrinho não encontrado', 404);

      default:
        return cartUpdated;
    }
  }

}) || _class) || _class) || _class) || _class);
var _default = UpdateCartService;
exports.default = _default;