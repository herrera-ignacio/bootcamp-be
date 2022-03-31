/* eslint-disable class-methods-use-this */
import UserRepository from "../repositories/UserRepository";

export default class UserService{

  private static getRepository(): ReturnType<typeof UserRepository> {
    return UserRepository();
  }


  public async getAll(): Promise<any>{
    return "User";
  }
}