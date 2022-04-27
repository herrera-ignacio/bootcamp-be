import slotRepository from "../repositories/SlotRepository";
import IRepository from "../types/IRepository";
import Slot from "../entities/Slot";
import NotFoundException from "../exceptions/NotFoundException";
import { IService } from "../types/IService";
import SlotCreateBodyValidator from "../validators/Slot/SlotCreateBodyValidator";
import SlotUpdateBodyValidator from "../validators/Slot/SlotUpdateBodyValidator";
import BookingService from "./BookingService";


export default class SlotService implements IService<Slot> {


  public getRepository(): IRepository<Slot> {
    return slotRepository();
  }

  private static notFoundErrorMessage = (
    key: string, value: string | number,

  ) => `Slot ${key}:${value} not found`;

  public async getByKey(
    key: string, val: string | number,
  ): Promise<Slot> {
    const repo = this.getRepository();
    const slot = await repo.findOneBy({ [key]: val });

    if (!slot) {
      throw new NotFoundException(SlotService.notFoundErrorMessage(
        key,
        val,
      ));
    }

    return slot;
  }

  getAll(): Promise<Slot[]> {
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

  /**
   * Updates slot (Disable slots and deletes bookings linked to it)
   * @param slotData
   * @returns slot
   */


  public async updateById(
    id: number,
    slotData: SlotUpdateBodyValidator,
  ): Promise<Slot> {
    const repo = this.getRepository();
    const slot = await this.getByKey(
      "id", id,
    );

    const bookingService = new BookingService();

    if (slot.isDisabled === false) {
      await bookingService.deleteBookingsBySlotId(id);
    }

    return repo.save({
      ...slot,
      ...slotData,
    });
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

