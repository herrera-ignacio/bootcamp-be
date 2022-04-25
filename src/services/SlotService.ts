import slotRepository from "../repositories/SlotRepository";
import IRepository from "../types/IRepository";
import Slot from "../entities/Slot";
import { IService } from "../types/IService";
import SlotCreateBodyValidator from "../validators/Slot/SlotCreateBodyValidator";
import NotFoundException from "../exceptions/NotFoundException";

export default class SlotService implements IService<Slot> {

  public getRepository(): IRepository<Slot> {
    return slotRepository();
  }

  private static notFoundErrorMessage = (
    key: string, value: string | number,
  ) => `Slot ${key}:${value} not found`;

  getAll(): Promise<Slot[]> {
    throw new Error("Method not implemented.");
  }

  getByKey(): Promise<Slot> {
    throw new Error("Method not implemented.");
  }

  /**
   * Creates a new slot
   * @param slotData
   * @returns slot
   */

  public async create(slotData: SlotCreateBodyValidator): Promise<Slot> {
    const repo = this.getRepository();
    const slot = await repo.save(slotData);

    return slot;
  }

  updateById(): Promise<Slot> {
    throw new Error("Method not implemented.");
  }

  public async deleteById(id: number): Promise<void> {
    const repo = this.getRepository();
    const affectedData = await repo.delete({ id });

    if (affectedData.affected === 0) {
      throw new NotFoundException(SlotService.notFoundErrorMessage(
        "id", id,
      ));
    }
  }
}
