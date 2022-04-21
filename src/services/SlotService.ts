import slotRepository from "../repositories/SlotRepository";
import IRepository from "../types/IRepository";
import Slot from "../entities/Slot";
import NotFoundException from "../exceptions/NotFoundException";


class SlotService {

  public getRepository(): IRepository<Slot> {
    return slotRepository();
  }

  private static notFoundErrorMessage = (
    key: string, value: string | number,
  ) => `room ${key}:${value} not found`;

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

}

export default SlotService;
