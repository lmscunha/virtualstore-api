import User from '@modules/users/infra/databases/entities/User';
import ICartDTO from '../dtos/ICartDTO';
import Cart from '../infra/databases/entities/Cart';

export default interface ICartProvider {
  findCartByUserId(user_id: string | undefined): Promise<Cart | null>;
  findProductsByUserId(user_id: string | undefined): Promise<Cart | null>;
  createACart(user_id: string | User): Promise<void>;
  updateCartProducts(newProductsData: ICartDTO): Promise<Cart | null>;
  emptyUserCart(user_id: string | User): Promise<void>;
  deleteCart(user_id: string): Promise<void>;
}
