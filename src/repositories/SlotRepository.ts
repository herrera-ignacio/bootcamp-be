import { Repository } from "typeorm";
import Database from "../providers/Database";
import Slot from "../entities/Slot";

const slotRepository = (): Repository<Slot> => Database.getConnection()
  .getRepository(Slot).extend({
    findById(id: number): Promise<Slot> {
      return this.findOne({ where: { id } });
    },
  });

export default slotRepository;
