/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import escapePodRepository from "../repositories/EscapePodRepository";
import { IService } from "../types/IService";
import EscapePod from "../entities/EscapePod";
import EscapePodCreateBodyValidator from "../validators/EscapePod/EscapePodCreateBodyValidator";
import IRepository from "../types/IRepository";
import NotImplementedException from "../exceptions/NotImplementedException";


export default class EscapePodService implements IService<EscapePod> {
  getAll(): Promise<EscapePod[]> {
    throw new NotImplementedException();
  }

  getByKey(
    _key: string, _val: string | number, _options: any,
  ): Promise<EscapePod> {
    throw new NotImplementedException();
  }

  updateById(
    _id: number, _data: any,
  ): Promise<EscapePod> {
    throw new NotImplementedException();
  }

  deleteById(_id: number): Promise<void> {
    throw new NotImplementedException();
  }

  public getRepository(): IRepository<EscapePod> {
    return escapePodRepository();
  }

  /**
   * Error message for NotFoundExceptions
   * @param key
   * @param value
   */

  private static notFoundErrorMessage = (
    key: string, value: string | number,
  ) => `EscapePod ${key}:${value} not found`;


  public async create(escapePodData: EscapePodCreateBodyValidator): Promise<EscapePod> {
    const escapePod = await this.getRepository().save(escapePodData);

    return escapePod;
  }

}
