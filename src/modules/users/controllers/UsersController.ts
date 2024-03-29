import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCartService from '@modules/purchase/services/Cart/CreateCartService';
import DeleteCartService from '@modules/purchase/services/Cart/DeleteCartService';
import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/User/CreateUserService/CreateUserService';
import UpdateUserService from '../services/User/UpdateUserService/UpdateUserService';
import DeleteUserService from '../services/User/DeleteUserService/DeleteUserService';
import AppError from '../../../shared/errors/AppError';

export default class UsersController {
  public async list(req: Request, res: Response): Promise<Response> {
    if (req.params.id) {
      const findUser = new UsersRepository();
      const userFound = await findUser.findById(req.params.id);

      switch (userFound) {
        case undefined:
          throw new AppError('Usuário não foi encontrado', 400);
        default:
      }

      return res.status(200).json(userFound);
    }

    const users = new UsersRepository();
    const usersFound = await users.find();

    return res.status(200).json(usersFound);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, phone, cpf } = req.body;

    const createUser = container.resolve(CreateUserService);
    const userId = await createUser.execute({
      name,
      email,
      password,
      phone,
      cpf,
    });

    const createUserCart = container.resolve(CreateCartService);
    await createUserCart.execute({
      user_id: userId,
    });

    return res.status(201).json({ id: userId });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email, password, phone, cpf } = req.body;
    const updateUser = container.resolve(UpdateUserService);
    const user = await updateUser.execute({
      id,
      name,
      email,
      password,
      phone,
      cpf,
    });

    return res.status(200).json(user);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userDeleted = container.resolve(DeleteUserService);
    await userDeleted.execute({ id });

    const deleteUserCart = container.resolve(DeleteCartService);
    await deleteUserCart.execute(id);

    return res.status(200).json({ message: 'Cadastro removido!' });
  }
}
