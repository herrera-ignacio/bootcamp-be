import slotRepository from "../repositories/SlotRepository";
import IRepository from "../types/IRepository";
import Slot from "../entities/Slot";
import SlotCreateBodyValidator from "../validators/Slot/SlotCreateBodyValidator";

class SlotService {

  public getRepository(): IRepository<Slot> {
    return slotRepository();
  }

  public async create(slotData: SlotCreateBodyValidator): Promise<Slot> {
    const repo = this.getRepository();
    const slot = await repo.save(slotData);

    return slot;
  }

}

export default SlotService;
