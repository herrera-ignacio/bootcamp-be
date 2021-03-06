import slotRepository from "../repositories/SlotRepository";
import Slot from "../entities/Slot";
import NotFoundException from "../exceptions/NotFoundException";
import { IService } from "../types/IService";
import SlotCreateBodyValidator from "../validators/Slot/SlotCreateBodyValidator";
import SlotUpdateBodyValidator from "../validators/Slot/SlotUpdateBodyValidator";
import BookingService from "./BookingService";
import RoomUpdateBodyValidator from "../validators/Room/RoomUpdateBodyValidator";
import ISlotRepository from "../types/Slot/ISlotRepository";



export default class SlotService implements IService<Slot> {


  public getRepository(): ISlotRepository {
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

  public async getAllSlotsByRoomId(roomId: number): Promise<Slot[]> {

    const repo = this.getRepository();

    return repo.findAllSlotsByRoomId(roomId);

  }


  /**
   * Creates a new slot
   * @param slotData
   * @returns slot
   */

  public async create(slotData: SlotCreateBodyValidator): Promise<Slot> {
    const repo = this.getRepository();
    const slot = await repo.save({
      ...slotData,
      room: {
        id: slotData.roomId,
      },
    });

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

    const [ slotUpdated ] = await Promise.all([
      repo.save({
        ...slot,
        ...slotData,
      }), slotData.isDisabled === true
        ? bookingService.deleteBookingsBySlotId(id)
        : Promise.resolve(),
    ]);

    return slotUpdated;
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



  public async disableSlotsByRoomId(
    roomId: number,
    roomData: RoomUpdateBodyValidator,
  ): Promise<void> {

    const repo = this.getRepository();

    const slots = await this.getAllSlotsByRoomId(roomId);

    const bookingService = new BookingService();

    await Promise.all([
      repo.disableSlotsByRoomId(roomId),
      roomData.isDisabled === true
        ? bookingService.deleteBookingsBySeveralSlotIds(slots.map(s => s.id))
        : Promise.resolve(),
    ]);


  }
}

