/* eslint-disable no-underscore-dangle */
import 'reflect-metadata';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '../../../config/auth';
import IHashUser from '../providers/HashUser/models/IHashUser';
import IUserEntity from '../entities/IUserEntity';
import UserRepository from '../repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: IUserEntity;
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
    // if (!user) {
    //   throw new Error('Incorrect email/password combination');
    // }

    const passwordMatched = await this.hashUser.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user._id,
      expiresIn,
    });
    return { user, token };
  }
}

export default AuthenticateUserService;
