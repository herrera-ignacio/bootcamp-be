/* eslint-disable class-methods-use-this */
import UserRepository from "../repositories/UserRepository";
// import { IService } from "../types/IService";
import User from "../entities/User";
import NotFoundException from "../exceptions/NotFoundException";
import UserUpdateBodyValidator from "../validators/User/UserUpdateBodyValidator";

export default class UserService{  

  private static getRepository(): ReturnType<typeof UserRepository> {
    return UserRepository();
  }

  /**
   * Error message for NotFoundExceptions
   * @param key
   * @param value
   */

  private static notFoundErrorMessage = (key:string, value: string | number) => `User ${key}:${value} not found`;

  /**
   * Get all the registered users
  */

  public async getAll(): Promise<User[]>{
    const users = await UserService.getRepository().find();
    return users;
  }

  /**
   * Get all the specific user by id
   * @param id
  */

  public async getById(id:number): Promise<User>{
    const user = await UserService.getRepository().findById(id);
    if (!user) throw new NotFoundException(UserService.notFoundErrorMessage("id", id));
    return user;
  }

  /**
   * Creates a new user
   * @param userData
  */

  
  public async create(userData:User): Promise<User>{
    const user = await UserService.getRepository().save(userData);
    return user;
  }

  /**
   * Updates user by Id
   * @param id
   */

  public async updateById(id: number, userUpdateData: UserUpdateBodyValidator): Promise<User> {
    const repo = UserService.getRepository();
    const user = await this.getById(id);

    if (!user) throw new NotFoundException(UserService.notFoundErrorMessage("id", id));

    repo.merge(user, userUpdateData);
    return UserService.getRepository().save(user);
  }

  /**
   * Deletes user by id
   * @param id
   */

  public async deleteById(id:number): Promise<void>{
    const repo = UserService.getRepository();
    const dataAffected = await repo.delete({ id });
    if (dataAffected.affected === 0) throw new NotFoundException(UserService.notFoundErrorMessage("id", id));
  }
}