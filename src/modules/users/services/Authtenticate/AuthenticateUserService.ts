import 'reflect-metadata';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '../../../../config/auth';
import IHashUser from '../../providers/HashUser/models/IHashUser';
import User from '../../infra/databases/entities/User';
import UserRepository from '../../repositories/UsersRepository';
import AppError from '../../../../shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}
@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: UserRepository,

    @inject('HashUser')
    private hashUser: IHashUser,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email ou Senha inválido', 401);
    }

    const passwordMatched = await this.hashUser.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Email ou Senha inválido', 401);
    }
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    return { user, token };
  }
}

export default AuthenticateUserService;
