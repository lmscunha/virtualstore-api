import { UserSchema } from '../databases/mongoose/schemas/UserSchema';
import IUserEntity from '../entities/IUserEntity';
import IUserDTO from '../dtos/IUserDTO';
import IUsersProvider from '../providers/IUsersProvider';

export default class UsersRepository implements IUsersProvider {
  public async find(id: string): Promise<IUserEntity> {
    const userId = await UserSchema.findById(id);

    if (userId === null) {
      throw new Error('User not found!');
    }

    return userId;
  }

  public async checkEmail(newUserEmail: string): Promise<boolean> {
    const notAvailableEmail = await UserSchema.findOne({
      email: newUserEmail,
    });

    if (!notAvailableEmail) {
      return true;
    }

    return false;
  }

  public async findByEmail(userEmail: string): Promise<IUserEntity> {
    const findUser = await UserSchema.findOne({
      email: userEmail,
    });

    if (!findUser) {
      throw new Error('Invalid Email or Password!');
    }

    return findUser;
  }

  public async save(userData: IUserDTO): Promise<IUserEntity> {
    const userCreated = new UserSchema(userData);
    await userCreated.save();
    return userCreated;
  }

  public async update(userData: IUserDTO): Promise<IUserEntity> {
    const userUpdated = await UserSchema.findByIdAndUpdate(
      userData.id,
      userData,
      { new: true },
    );

    if (userUpdated === null) {
      throw new Error('User not found!');
    }

    return userUpdated;
  }

  public async delete(user: IUserDTO): Promise<void> {
    const userDeleted = await UserSchema.findByIdAndDelete(user.id);

    if (userDeleted === null) {
      throw new Error('User not found!');
    }
  }
}
