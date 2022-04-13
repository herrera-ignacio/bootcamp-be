/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import escapePodRepository from "../repositories/EscapePodRepository";
import { IService } from "../types/IService";
import EscapePod from "../entities/EscapePod";
import EscapePodCreateBodyValidator from "../validators/EscapePod/EscapePodCreateBodyValidator";
import IRepository from "../types/IRepository";
import NotImplementedException from "../exceptions/NotImplementedException";
import EscapePodUpdateBodyValidator from "../validators/EscapePod/EscapePodUpdateBodyValidator";
import NotFoundException from "../exceptions/NotFoundException";


export default class EscapePodService implements IService<EscapePod> {
  getAll(): Promise<EscapePod[]> {
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


  public async getByKey(
    key: string, val: string | number,
  ): Promise<EscapePod> {

    const escapePod = await this.getRepository().findOneBy({ [key]: val });

    if (!escapePod) {
      throw new NotFoundException(EscapePodService.notFoundErrorMessage(
        key, val,
      ));
    }

    return escapePod;

  }


  public async create(escapePodData: EscapePodCreateBodyValidator): Promise<EscapePod> {
    const escapePod = await this.getRepository().save(escapePodData);

    return escapePod;
  }

  public async updateById(
    id: number, escapedPodData: EscapePodUpdateBodyValidator,
  ): Promise<EscapePod> {

    const escapedPod = await this.getByKey(
      "id", id,
    );

    const repo = this.getRepository();

    return repo.save({
      ...escapedPod,
      ...escapedPodData,
    });
  }

  public async deleteById(id: number): Promise<void> {

    const repo = this.getRepository();

    const affectedData = await repo.delete(id);

    if (affectedData.affected === 0) {
      throw new NotFoundException(EscapePodService.notFoundErrorMessage(
        "id",
        id,
      ));
    }

  }



}
