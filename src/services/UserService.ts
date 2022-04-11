/* eslint-disable class-methods-use-this */
import userRepository from "../repositories/UserRepository";
import { IService } from "../types/IService";
import User from "../entities/User";
import NotFoundException from "../exceptions/NotFoundException";
import UserUpdateBodyValidator from "../validators/User/UserUpdateBodyValidator";
import UserCreateBodyValidator from "../validators/User/UserCreateBodyValidator";
import IRepository from "../types/IRepository";


export default class UserService implements IService<User> {

  public getRepository(): IRepository<User> {
    return userRepository();
  }

  /**
   * Error message for NotFoundExceptions
   * @param key
   * @param value
   */

  private static notFoundErrorMessage = (
    key: string, value: string | number,
  ) => `User ${key}:${value} not found`;

  /**
   * Get all the registered users
  */

  public async getAll(): Promise<User[]> {
    const users = await this.getRepository().find();

    return users;
  }


  public async getByKey(
    key: string,
    val: number | string,
  ): Promise<User> {
    const user = await this.getRepository().findOneBy({ [key]: val });

    if (!user) {
      throw new NotFoundException(UserService.notFoundErrorMessage(
        key, val,
      ));
    }

    return user;

  }

  /**
   * Get all the specific user by id
   * @param id
  */

  public async getById(id: number): Promise<User> {


    const user = await this.getRepository().findOneBy({ id });

    if (!user) {
      throw new NotFoundException(UserService.notFoundErrorMessage(
        "id", id,
      ));
    }
    return user;
  }

  /**
   * Get all the specific user by email
   * @param email
  */

  public async getByEmail(email: string): Promise<User> {
    const user = await this.getRepository().findOneBy({ email });

    if (!user) {
      throw new NotFoundException(UserService.notFoundErrorMessage(
        "email", email,
      ));
    }
    return user;
  }

  /**
   * Get all the specific user by auth0_id
   * @param auth0_id
  */

  public async getByAuth0Id(auth0Id: string): Promise<User> {
    const user = await this.getRepository().findOneBy({ auth0Id });

    if (!user) {
      throw new NotFoundException(UserService.notFoundErrorMessage(
        "auth0Id", auth0Id,
      ));
    }
    return user;
  }

  /**
   * Creates a new user
   * @param userData
  */


  public async create(userData: UserCreateBodyValidator): Promise<User> {
    const user = await this.getRepository().save(userData);

    return user;
  }

  /**
   * Updates user by Id
   * @param id
   */

  public async updateById(
    id: number, userUpdateData: UserUpdateBodyValidator,
  ): Promise<User> {
    const user = await this.getById(id);
    const repo = this.getRepository();

    return repo.save({
      ...user,
      ...userUpdateData,
    });
  }

  /**
   * Deletes user by id
   * @param id
   */

  public async deleteById(id: number): Promise<void> {
    const repo = this.getRepository();
    const dataAffected = await repo.delete({ id });

    if (dataAffected.affected === 0) {
      throw new NotFoundException(UserService.notFoundErrorMessage(
        "id", id,
      ));

    }
  }
}
