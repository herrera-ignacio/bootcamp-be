/* eslint-disable class-methods-use-this */
import escapePodRepository from "../repositories/EscapePodRepository";
import { IService } from "../types/IService";
import EscapePod from "../entities/EscapePod";
import EscapePodCreateBodyValidator from "../validators/EscapePod/EscapePodCreateBodyValidator";
import IRepository from "../types/IRepository";


export default class EscapePodService implements IService<EscapePod> {

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
