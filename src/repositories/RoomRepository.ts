import { Repository } from "typeorm";
import Database from "../providers/Database";
import Room from "../entities/Room";

const roomRepository = (): Repository<Room> => Database.getConnection()
  .getRepository(Room).extend({
    findById(id: number): Promise<Room> {
      return this.findOne({ where: { id } });
    },
  });

export default roomRepository;
