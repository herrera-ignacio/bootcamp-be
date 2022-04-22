import slotRepository from "../repositories/SlotRepository";
import IRepository from "../types/IRepository";
import Slot from "../entities/Slot";
import { IService } from "../types/IService";
import SlotCreateBodyValidator from "../validators/Slot/SlotCreateBodyValidator";

export default class SlotService implements IService<Slot> {

  public getRepository(): IRepository<Slot> {
    return slotRepository();
  }

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

  deleteById(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
